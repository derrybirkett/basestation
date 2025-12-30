import { useEffect, useState } from 'react';
import styles from '../app/app.module.css';
import {
  listGithubRepos,
  type GithubReposResult,
} from '../integrations/github/github-adapter';

type ReposWidgetProps = {
  githubEnabled: boolean;
};

export function ReposWidget({ githubEnabled }: ReposWidgetProps) {
  const [reposResult, setReposResult] = useState<GithubReposResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!githubEnabled) {
      setReposResult(null);
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    setIsLoading(true);
    listGithubRepos()
      .then((next) => {
        if (!isMounted) return;
        setReposResult(next);
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [githubEnabled]);

  if (!githubEnabled) {
    return (
      <div className={styles.widget}>
        <h3 className={styles.widgetTitle}>Repos</h3>
        <p className={styles.widgetBody}>
          Enable the GitHub integration to see repos.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.widget}>
      <h3 className={styles.widgetTitle}>Repos</h3>
      <div className={styles.widgetBody}>
        {isLoading ? (
          <div>Loading…</div>
        ) : reposResult?.kind === 'not-connected' ? (
          <div>
            <p>Connect GitHub to see repos.</p>
            <a className={styles.repoLink} href="/auth/github/start">
              Connect GitHub
            </a>
          </div>
        ) : reposResult?.kind === 'ok' && reposResult.repos.length ? (
          <ul className={styles.repoList}>
            {reposResult.repos.map((repo) => (
              <li key={repo.id} className={styles.repoListItem}>
                <a className={styles.repoLink} href={repo.url}>
                  {repo.fullName}
                </a>
              </li>
            ))}
          </ul>
        ) : reposResult?.kind === 'error' ? (
          <div>{reposResult.message}</div>
        ) : (
          <div>No repos yet.</div>
        )}
      </div>
    </div>
  );
}
