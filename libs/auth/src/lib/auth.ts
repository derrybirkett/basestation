export type AuthUser = {
  id: string;
  email?: string | null;
};

export type AuthSession = {
  user: AuthUser | null;
};

export interface AuthAdapter {
  readonly name: string;
  getSession(): Promise<AuthSession | null>;
  signOut(): Promise<void>;
}

export function createNoopAuthAdapter(): AuthAdapter {
  return {
    name: 'noop',
    async getSession() {
      return null;
    },
    async signOut() {
      return;
    },
  };
}
