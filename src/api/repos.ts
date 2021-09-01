import { ERROR_CODES } from '../config';
import { AppError } from '../utils/app-error';
import { GithubClientError, githubProvider } from './providers';

export type GetRepoArgs = {
  owner: string;
  repo: string;
};

export type Repo = {
  name: string;
  owner: {
    login: string; // owner name
    avatar_url: string;
  };
};

// https://docs.github.com/en/rest/reference/repos#get-a-repository
export async function getRepo({ owner, repo }: GetRepoArgs): Promise<Repo> {
  const res = await githubProvider.get(`/repos/${owner}/${repo}`);

  if (!res.ok) {
    const { message } = (res.data as GithubClientError) ?? {};
    throw new AppError(ERROR_CODES.getRepo, message);
  }

  return res.data as Repo;
}

export type GithubReposApi = {
  getRepo: (args: GetRepoArgs) => Promise<Repo>;
};
