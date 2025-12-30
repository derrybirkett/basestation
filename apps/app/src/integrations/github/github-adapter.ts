export type GithubRepo = {
  id: string;
  name: string;
  fullName: string;
  url: string;
};

export async function listGithubRepos(): Promise<GithubRepo[]> {
  return [
    {
      id: 'r1',
      name: 'basestation',
      fullName: 'derrybirkett/basestation',
      url: 'https://github.com/derrybirkett/basestation',
    },
    {
      id: 'r2',
      name: 'pip',
      fullName: 'derrybirkett/pip',
      url: 'https://github.com/derrybirkett/pip',
    },
    {
      id: 'r3',
      name: 'x',
      fullName: 'derrybirkett/x',
      url: 'https://github.com/derrybirkett/x',
    },
  ];
}
