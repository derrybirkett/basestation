import { useEffect, useState } from 'react';
import styles from '../app/app.module.css';
import { listGithubRepos, type GithubRepo } from '../integrations/github/github-adapter';

type ReposWidgetProps = {
  githubEnabled: boolean;
};

export function ReposWidget({ githubEnabled }: ReposWidgetProps) {
  const [repos, setRepos] = useState<GithubRepo[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!githubEnabled) {
      setRepos(null);
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    setIsLoading(true);
    listGithubRepos()
      .then((next) => {
        if (!isMounted) return;
        setRepos(next);
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
        ) : repos && repos.length ? (
          <ul className={styles.repoList}>
            {repos.map((repo) => (
              <li key={repo.id} className={styles.repoListItem}>
                <a className={styles.repoLink} href={repo.url}>
                  {repo.fullName}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div>No repos yet.</div>
        )}
      </div>
    </div>
  );
}
