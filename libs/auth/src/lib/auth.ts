export type AuthUser = {
  id: string;
  email?: string | null;
};

export type AuthSession = {
  user: AuthUser | null;
};

export type SignInOptions = {
  email?: string | null;
};

export interface AuthAdapter {
  readonly name: string;
  getSession(): Promise<AuthSession | null>;
	// Provider-agnostic sign-in. Concrete adapters decide how to interpret options.
  signIn(options?: SignInOptions): Promise<AuthSession>;
  signOut(): Promise<void>;
}

export function createNoopAuthAdapter(): AuthAdapter {
  return {
    name: 'noop',
    async getSession() {
      return null;
    },
    async signIn() {
      return { user: null };
    },
    async signOut() {
      return;
    },
  };
}

const LOCAL_STORAGE_KEY = 'basestation.auth.session.v1';

function safeRandomId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${Math.random().toString(16).slice(2)}${Date.now().toString(16)}`;
}

export function createLocalStorageAuthAdapter(): AuthAdapter {
  return {
    name: 'localStorage',
    async getSession() {
      if (typeof window === 'undefined') return null;
      const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!raw) return null;
      try {
        const parsed = JSON.parse(raw) as AuthSession;
        return parsed;
      } catch {
        return null;
      }
    },
    async signIn(options) {
      if (typeof window === 'undefined') {
        return { user: null };
      }
      const session: AuthSession = {
        user: {
          id: safeRandomId(),
          email: options?.email ?? null,
        },
      };
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(session));
      return session;
    },
    async signOut() {
      if (typeof window === 'undefined') return;
      window.localStorage.removeItem(LOCAL_STORAGE_KEY);
    },
  };
}
