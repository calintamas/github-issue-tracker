import { ERROR_CODES } from '../config';
import { AppError } from '../utils/app-error';
import { githubProvider } from './providers';

// https://docs.github.com/en/rest/reference/issues#list-repository-issues--parameters
type RepositoryIssue = {
  created_at: string;
  updated_at: string;
  state: 'open | closed | all';
  title: string;
  url: string;
  number: number;
  comments: number;
};

// https://docs.github.com/en/rest/overview/resources-in-the-rest-api#client-errors
type ClientError = {
  message?: string;
};

export type RepositoryIssuesParams = {
  owner: string;
  repo: string;
  page?: number;
  per_page?: number;
};

export type RepositoryIssues = Promise<RepositoryIssue[]>;

async function getRepositoryIssues({
  owner,
  repo,
  page = 1,
  per_page = 30
}: RepositoryIssuesParams): RepositoryIssues {
  const res = await githubProvider.get(`/repos/${owner}/${repo}/issues`, {
    page,
    per_page
  });

  if (!res.ok) {
    const { message } = (res.data as ClientError) ?? {};
    throw new AppError(ERROR_CODES.getRepositoryIssues, message);
  }

  return res.data as RepositoryIssue[];
}

export type GithubIssuesApi = {
  getRepositoryIssues: (args: RepositoryIssuesParams) => RepositoryIssues;
};

export { getRepositoryIssues };
