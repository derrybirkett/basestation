import { render } from '@testing-library/react';
import { createNoopAuthAdapter } from 'auth';

import App from './app';
import { AuthAdapterProvider } from '../auth/auth-adapter';
import { AuthSessionProvider } from '../auth/auth-session';

function renderWithAuth() {
  const adapter = createNoopAuthAdapter();
  return render(
    <AuthAdapterProvider adapter={adapter}>
      <AuthSessionProvider>
        <App />
      </AuthSessionProvider>
    </AuthAdapterProvider>,
  );
}

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = renderWithAuth();
    expect(baseElement).toBeTruthy();
  });

  it('should show sign in when signed out', async () => {
    const { findByRole } = renderWithAuth();
    expect(await findByRole('heading', { name: 'Sign in' })).toBeTruthy();
  });
});
