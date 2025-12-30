import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { randomUUID } from 'node:crypto';

type GithubRepo = {
  id: string;
  name: string;
  fullName: string;
  url: string;
};

type SessionRecord = {
  oauthState?: string;
  githubAccessToken?: string;
};

const sessions = new Map<string, SessionRecord>();

function getEnv(name: string): string | undefined {
  const value = process.env[name];
  if (!value) return undefined;
  return value;
}

function getRequiredEnv(name: string): string {
  const value = getEnv(name);
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

function json(res: ServerResponse, status: number, body: unknown) {
  const payload = JSON.stringify(body);
  res.statusCode = status;
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.setHeader('content-length', Buffer.byteLength(payload));
  res.end(payload);
}

function redirect(res: ServerResponse, location: string, status = 302) {
  res.statusCode = status;
  res.setHeader('location', location);
  res.end();
}

function parseCookies(header: string | undefined): Record<string, string> {
  if (!header) return {};
  const result: Record<string, string> = {};
  for (const part of header.split(';')) {
    const [rawKey, ...rest] = part.trim().split('=');
    if (!rawKey) continue;
    const rawValue = rest.join('=');
    result[rawKey] = decodeURIComponent(rawValue ?? '');
  }
  return result;
}

function setCookie(
  res: ServerResponse,
  name: string,
  value: string,
  options: {
    httpOnly?: boolean;
    path?: string;
    sameSite?: 'Lax' | 'Strict' | 'None';
    maxAgeSeconds?: number;
  } = {},
) {
  const segments = [`${name}=${encodeURIComponent(value)}`];
  segments.push(`Path=${options.path ?? '/'}`);
  if (options.httpOnly ?? true) segments.push('HttpOnly');
  segments.push(`SameSite=${options.sameSite ?? 'Lax'}`);
  if (typeof options.maxAgeSeconds === 'number') {
    segments.push(`Max-Age=${options.maxAgeSeconds}`);
  }

  const existing = res.getHeader('set-cookie');
  const next = segments.join('; ');
  if (!existing) {
    res.setHeader('set-cookie', next);
  } else if (Array.isArray(existing)) {
    res.setHeader('set-cookie', [...existing, next]);
  } else {
    res.setHeader('set-cookie', [String(existing), next]);
  }
}

function getOrCreateSessionId(
  req: IncomingMessage,
  res: ServerResponse,
): string {
  const cookies = parseCookies(req.headers.cookie);
  const existing = cookies['bs_session'];
  if (existing) {
    if (!sessions.has(existing)) sessions.set(existing, {});
    return existing;
  }

  const id = randomUUID();
  sessions.set(id, {});
  setCookie(res, 'bs_session', id, { httpOnly: true, sameSite: 'Lax' });
  return id;
}

function getApiBaseUrl(req: IncomingMessage): string {
  const configured = getEnv('API_BASE_URL');
  if (configured) return configured;

  const host = req.headers.host;
  if (!host) return 'http://127.0.0.1:8787';
  return `http://${host}`;
}

function getFrontendUrl(): string {
  return getEnv('FRONTEND_URL') ?? 'http://127.0.0.1:4200/';
}

function getGithubCallbackUrl(req: IncomingMessage): string {
  return (
    getEnv('GITHUB_OAUTH_CALLBACK_URL') ??
    `${getApiBaseUrl(req)}/auth/github/callback`
  );
}

async function exchangeGithubCodeForToken(args: {
  clientId: string;
  clientSecret: string;
  code: string;
  redirectUri: string;
  state: string;
}): Promise<string> {
  const body = new URLSearchParams({
    client_id: args.clientId,
    client_secret: args.clientSecret,
    code: args.code,
    redirect_uri: args.redirectUri,
    state: args.state,
  });

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  const jsonBody = (await response.json()) as
    | { access_token?: string; error?: string; error_description?: string }
    | undefined;

  if (!response.ok) {
    throw new Error(
      `GitHub token exchange failed (${response.status}): ${JSON.stringify(jsonBody)}`,
    );
  }

  const token = jsonBody?.access_token;
  if (!token) {
    throw new Error(
      `GitHub token exchange returned no access_token: ${JSON.stringify(jsonBody)}`,
    );
  }

  return token;
}

type GithubApiRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
};

function isGithubApiRepoArray(value: unknown): value is GithubApiRepo[] {
  if (!Array.isArray(value)) return false;
  return value.every((repo) => {
    if (typeof repo !== 'object' || repo === null) return false;
    const r = repo as Record<string, unknown>;
    return (
      typeof r['id'] === 'number' &&
      typeof r['name'] === 'string' &&
      typeof r['full_name'] === 'string' &&
      typeof r['html_url'] === 'string'
    );
  });
}

async function fetchGithubRepos(accessToken: string): Promise<GithubRepo[]> {
  const response = await fetch(
    'https://api.github.com/user/repos?per_page=100&sort=updated',
    {
      headers: {
        accept: 'application/vnd.github+json',
        authorization: `Bearer ${accessToken}`,
        'user-agent': 'basestation',
        'x-github-api-version': '2022-11-28',
      },
    },
  );

  const payload = (await response.json()) as unknown;
  if (!response.ok) {
    throw new Error(
      `GitHub repos fetch failed (${response.status}): ${JSON.stringify(payload)}`,
    );
  }

  if (!isGithubApiRepoArray(payload)) {
    throw new Error(`Unexpected repos payload: ${JSON.stringify(payload)}`);
  }

  return payload
    .map((repo) => ({
      id: String(repo.id),
      name: repo.name,
      fullName: repo.full_name,
      url: repo.html_url,
    }))
    .filter((repo) => repo.id.length > 0 && repo.fullName.length > 0 && repo.url.length > 0);
}

const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const url = new URL(req.url ?? '/', getApiBaseUrl(req));

    if (req.method === 'GET' && url.pathname === '/health') {
      return json(res, 200, { ok: true });
    }

    if (req.method === 'GET' && url.pathname === '/api/github/repos') {
      const sessionId = getOrCreateSessionId(req, res);
      const session = sessions.get(sessionId) ?? {};
      sessions.set(sessionId, session);

      if (!session.githubAccessToken) {
        return json(res, 401, { error: 'github_not_connected' });
      }

      const repos = await fetchGithubRepos(session.githubAccessToken);
      return json(res, 200, repos);
    }

    if (req.method === 'GET' && url.pathname === '/api/github/status') {
      const sessionId = getOrCreateSessionId(req, res);
      const session = sessions.get(sessionId) ?? {};
      sessions.set(sessionId, session);
      return json(res, 200, { connected: Boolean(session.githubAccessToken) });
    }

    if (req.method === 'GET' && url.pathname === '/auth/github/start') {
      const clientId = getRequiredEnv('GITHUB_CLIENT_ID');

      const sessionId = getOrCreateSessionId(req, res);
      const session = sessions.get(sessionId) ?? {};

      const oauthState = randomUUID();
      session.oauthState = oauthState;
      sessions.set(sessionId, session);

      const redirectUri = getGithubCallbackUrl(req);
      const authorize = new URL('https://github.com/login/oauth/authorize');
      authorize.searchParams.set('client_id', clientId);
      authorize.searchParams.set('redirect_uri', redirectUri);
      authorize.searchParams.set('state', oauthState);
      authorize.searchParams.set('scope', 'read:user repo');

      return redirect(res, authorize.toString());
    }

    if (req.method === 'GET' && url.pathname === '/auth/github/callback') {
      const clientId = getRequiredEnv('GITHUB_CLIENT_ID');
      const clientSecret = getRequiredEnv('GITHUB_CLIENT_SECRET');

      const sessionId = getOrCreateSessionId(req, res);
      const session = sessions.get(sessionId) ?? {};

      const code = url.searchParams.get('code');
      const state = url.searchParams.get('state');
      if (!code || !state) {
        return json(res, 400, { error: 'missing_code_or_state' });
      }

      if (!session.oauthState || session.oauthState !== state) {
        return json(res, 400, { error: 'invalid_state' });
      }

      const redirectUri = getGithubCallbackUrl(req);
      const token = await exchangeGithubCodeForToken({
        clientId,
        clientSecret,
        code,
        redirectUri,
        state,
      });

      session.githubAccessToken = token;
      session.oauthState = undefined;
      sessions.set(sessionId, session);

      return redirect(res, getFrontendUrl());
    }

    return json(res, 404, { error: 'not_found' });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return json(res, 500, { error: 'internal_error', message });
  }
});

const host = getEnv('API_HOST') ?? '127.0.0.1';
const port = Number(getEnv('API_PORT') ?? '8787');

server.listen(port, host, () => {
  console.log(`api listening on http://${host}:${port}`);
});

process.on('SIGTERM', () => {
  server.close();
});
