import { Button } from '@base-ui/react/button';
import { Input } from '@base-ui/react/input';
import { useState } from 'react';
import styles from './app.module.css';
import { useAuthSession } from '../auth/auth-session';
import { useIntegrationSettings } from '../integrations/use-integration-settings';
import { ReposWidget } from '../widgets/repos-widget';

export function App() {
  const { session, isLoading, signIn, signOut } = useAuthSession();
  const [email, setEmail] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const { settings, setGithubEnabled } = useIntegrationSettings();

  if (isLoading) {
    return null;
  }

  if (!session?.user) {
    return (
      <div className={styles.page}>
        <div className={styles.authLayout}>
          <header className={styles.authHeader}>
            <h1 className={styles.authTitle}>Sign in</h1>
          </header>

          <form
            className={styles.authForm}
            onSubmit={async (e) => {
              e.preventDefault();
              await signIn({ email });
            }}
          >
            <label className={styles.authLabel}>
              Email
              <Input
                className={styles.chatInput}
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                autoComplete="email"
              />
            </label>

            <Button className={styles.sendButton} type="submit">
              Sign in
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <div className={styles.topBarTitle}>basestation</div>

        <div className={styles.userMenu}>
          <Button
            className={styles.userMenuButton}
            type="button"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {session.user.email ?? 'Account'}
          </Button>

          {menuOpen ? (
            <div className={styles.userMenuList} role="menu">
              <Button
                className={styles.userMenuItem}
                type="button"
                role="menuitem"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Button>
              <Button
                className={styles.userMenuItem}
                type="button"
                role="menuitem"
                onClick={() => setMenuOpen(false)}
              >
                Settings
              </Button>
              <Button
                className={styles.userMenuItem}
                type="button"
                role="menuitem"
                onClick={async () => {
                  setMenuOpen(false);
                  await signOut();
                }}
              >
                Logout
              </Button>
            </div>
          ) : null}
        </div>
      </header>

      <div className={styles.layout}>
        <section className={styles.chatColumn} aria-label="Chat">
          <header className={styles.columnHeader}>
            <h1 className={styles.columnTitle}>Chat</h1>
          </header>

          <div className={styles.chatBody}>
            <div className={styles.chatPlaceholder}>
              <p className={styles.placeholderTitle}>No messages yet</p>
              <p className={styles.placeholderBody}>
                Ask basestation anything about your accounts and data.
              </p>
            </div>
          </div>

          <form
            className={styles.chatComposer}
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              className={styles.chatInput}
              aria-label="Message"
              placeholder="Message…"
            />
            <Button className={styles.sendButton} type="submit">
              Send
            </Button>
          </form>
        </section>

        <section className={styles.widgetsColumn} aria-label="Widgets">
          <header className={styles.columnHeader}>
            <h2 className={styles.columnTitle}>Widgets</h2>
          </header>

          <div className={styles.widgetsBody}>
            <div className={styles.widget}>
              <h3 className={styles.widgetTitle}>Marketplace</h3>
              <div className={styles.widgetBody}>
                <div className={styles.integrationRow}>
                  <div className={styles.integrationCopy}>
                    <div className={styles.integrationName}>GitHub</div>
                    <div className={styles.integrationDescription}>
                      Connect repos and activity.
                    </div>
                  </div>

                  <label className={styles.integrationToggle}>
                    <input
                      className={styles.integrationToggleInput}
                      type="checkbox"
                      checked={settings.github.enabled}
                      onChange={(e) => setGithubEnabled(e.currentTarget.checked)}
                      aria-label="Enable GitHub integration"
                    />
                    <span className={styles.integrationToggleText}>
                      {settings.github.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <ReposWidget githubEnabled={settings.github.enabled} />
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
