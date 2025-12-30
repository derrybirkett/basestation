import { createContext, useContext } from 'react';
import type { PropsWithChildren } from 'react';
import type { AuthAdapter } from 'auth';

const AuthAdapterContext = createContext<AuthAdapter | null>(null);

export function AuthAdapterProvider({
  adapter,
  children,
}: PropsWithChildren<{ adapter: AuthAdapter }>) {
  return (
    <AuthAdapterContext.Provider value={adapter}>
      {children}
    </AuthAdapterContext.Provider>
  );
}

export function useAuthAdapter(): AuthAdapter {
  const adapter = useContext(AuthAdapterContext);
  if (!adapter) {
    throw new Error('Missing AuthAdapterProvider');
  }
  return adapter;
}
