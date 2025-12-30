import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import type { AuthSession, SignInOptions } from 'auth';
import { useAuthAdapter } from './auth-adapter';

type AuthSessionContextValue = {
  session: AuthSession | null;
  isLoading: boolean;
  signIn: (options?: SignInOptions) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthSessionContext = createContext<AuthSessionContextValue | null>(null);

export function AuthSessionProvider({ children }: PropsWithChildren) {
  const adapter = useAuthAdapter();
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    adapter
      .getSession()
      .then((next) => {
        if (!isMounted) return;
        setSession(next);
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [adapter]);

  const signIn = useCallback(
    async (options?: SignInOptions) => {
      const next = await adapter.signIn(options);
      setSession(next);
    },
    [adapter],
  );

  const signOut = useCallback(async () => {
    await adapter.signOut();
    setSession(null);
  }, [adapter]);

  const value = useMemo<AuthSessionContextValue>(
    () => ({ session, isLoading, signIn, signOut }),
    [session, isLoading, signIn, signOut],
  );

  return (
    <AuthSessionContext.Provider value={value}>
      {children}
    </AuthSessionContext.Provider>
  );
}

export function useAuthSession(): AuthSessionContextValue {
  const value = useContext(AuthSessionContext);
  if (!value) {
    throw new Error('Missing AuthSessionProvider');
  }
  return value;
}
