import { fireEvent, render } from '@testing-library/react';
import type { AuthAdapter } from 'auth';
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
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should render successfully', () => {
    const { baseElement } = renderWithAuth();
    expect(baseElement).toBeTruthy();
  });

  it('should show sign in when signed out', async () => {
    const { findByRole } = renderWithAuth();
    expect(await findByRole('heading', { name: 'Sign in' })).toBeTruthy();
  });

  it('should allow enabling the GitHub integration', async () => {
    const adapter: AuthAdapter = {
      name: 'test',
      async getSession() {
        return { user: { id: 'u1', email: 'dev@example.com' } };
      },
      async signIn() {
        return { user: { id: 'u1', email: 'dev@example.com' } };
      },
      async signOut() {
        return;
      },
    };

    const { findByLabelText, findByText } = render(
      <AuthAdapterProvider adapter={adapter}>
        <AuthSessionProvider>
          <App />
        </AuthSessionProvider>
      </AuthAdapterProvider>,
    );

    const toggle = (await findByLabelText(
      'Enable GitHub integration',
    )) as HTMLInputElement;

    expect(toggle.checked).toBe(false);
    fireEvent.click(toggle);
    expect(toggle.checked).toBe(true);

    expect(await findByText('derrybirkett/basestation')).toBeTruthy();

    const persisted = window.localStorage.getItem(
      'basestation.integrations.settings.v1',
    );
    expect(persisted).toContain('"enabled":true');
  });
});
