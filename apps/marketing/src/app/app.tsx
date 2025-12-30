import styles from './app.module.css';

export function App() {
  return (
    <div className={styles.page}>
      <main className={styles.hero}>
        <h1 className={styles.title}>basestation</h1>
        <p className={styles.subtitle}>
          One place to pull all data sources into a hub.
        </p>

        <a className={styles.primaryCta} href="http://localhost:4200/">
          Sign in
        </a>
      </main>
    </div>
  );
}

export default App;


