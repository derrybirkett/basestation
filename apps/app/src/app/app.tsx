import { Button } from '@base-ui/react/button';
import { Input } from '@base-ui/react/input';
import styles from './app.module.css';

export function App() {
  return (
    <div className={styles.page}>
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
              <h3 className={styles.widgetTitle}>Data</h3>
              <p className={styles.widgetBody}>Widget placeholders for now.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
