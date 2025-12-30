export type GithubRepo = {
  id: string;
  name: string;
  fullName: string;
  url: string;
};

export type GithubReposResult =
  | { kind: 'ok'; repos: GithubRepo[] }
  | { kind: 'not-connected' }
  | { kind: 'error'; message: string };

function getSource(): 'mock' | 'api' {
  const configured =
    (import.meta as any).env?.VITE_GITHUB_SOURCE ??
    (globalThis as any).process?.env?.VITE_GITHUB_SOURCE;
  return configured === 'api' ? 'api' : 'mock';
}

function getMockRepos(): GithubRepo[] {
  return [
    {
      id: 'r1',
      name: 'basestation',
      fullName: 'derrybirkett/basestation',
      url: 'https://github.com/derrybirkett/basestation',
    },
    {
      id: 'r2',
      name: 'pip',
      fullName: 'derrybirkett/pip',
      url: 'https://github.com/derrybirkett/pip',
    },
    {
      id: 'r3',
      name: 'x',
      fullName: 'derrybirkett/x',
      url: 'https://github.com/derrybirkett/x',
    },
  ];
}

export async function listGithubRepos(): Promise<GithubReposResult> {
  if (getSource() === 'mock') {
    return { kind: 'ok', repos: getMockRepos() };
  }

  try {
    const response = await fetch('/api/github/repos', {
      credentials: 'include',
    });

    if (response.status === 401) {
      return { kind: 'not-connected' };
    }

    if (!response.ok) {
      const text = await response.text();
      return {
        kind: 'error',
        message: `Failed to fetch repos (${response.status}): ${text}`,
      };
    }

    const repos = (await response.json()) as GithubRepo[];
    return { kind: 'ok', repos };
  } catch (error) {
    return {
      kind: 'error',
      message: error instanceof Error ? error.message : String(error),
    };
  }
}
