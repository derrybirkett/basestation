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

  it('should show connect UI when GitHub source is api and not connected', async () => {
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

    const originalGithubSource = process.env.VITE_GITHUB_SOURCE;
    process.env.VITE_GITHUB_SOURCE = 'api';

    const originalFetch = window.fetch;
    window.fetch = (async () =>
      new Response(JSON.stringify({ error: 'github_not_connected' }), {
        status: 401,
        headers: { 'content-type': 'application/json' },
      })) as any;

    const { findByLabelText, findByRole } = render(
      <AuthAdapterProvider adapter={adapter}>
        <AuthSessionProvider>
          <App />
        </AuthSessionProvider>
      </AuthAdapterProvider>,
    );

    const toggle = (await findByLabelText(
      'Enable GitHub integration',
    )) as HTMLInputElement;
    fireEvent.click(toggle);

    expect(
      await findByRole('link', { name: 'Connect GitHub' }),
    ).toBeTruthy();

    window.fetch = originalFetch;
    process.env.VITE_GITHUB_SOURCE = originalGithubSource;
  });
});
