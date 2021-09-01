import { ERROR_CODES } from '../config';
import { AppError } from '../utils/app-error';
import { GithubClientError, githubProvider } from './providers';

export type RepositoryIssueStatus = 'open' | 'closed' | 'all';

// https://docs.github.com/en/rest/reference/issues#list-repository-issues--parameters
export type RepositoryIssue = {
  created_at: string;
  updated_at: string;
  state: RepositoryIssueStatus;
  title: string;
  body: string;
  url: string;
  number: number;
  comments: number;
};

export type GetRepositoryIssuesArgs = {
  owner?: string;
  repo?: string;
  page?: number;
  perPage?: number;
  status?: RepositoryIssueStatus;
};

// https://docs.github.com/en/rest/reference/issues#list-repository-issues
export async function getRepositoryIssues({
  owner,
  repo,
  page = 1,
  perPage = 30,
  status = 'all'
}: GetRepositoryIssuesArgs): Promise<RepositoryIssue[]> {
  const res = await githubProvider.get(`/repos/${owner}/${repo}/issues`, {
    page,
    per_page: perPage,
    state: status
  });

  if (!res.ok) {
    const { message } = (res.data as GithubClientError) ?? {};
    throw new AppError(ERROR_CODES.getRepositoryIssues, message);
  }

  return res.data as RepositoryIssue[];
}

type GetRepoIssueByNumberArgs = {
  owner: string;
  repo: string;
  issueNumber: number;
};

// https://docs.github.com/en/rest/reference/issues#get-an-issue
export async function getRepoIssueByNumber({
  owner,
  repo,
  issueNumber
}: GetRepoIssueByNumberArgs): Promise<RepositoryIssue> {
  const res = await githubProvider.get(
    `/repos/${owner}/${repo}/issues/${issueNumber}`
  );

  if (!res.ok) {
    const { message } = (res.data as GithubClientError) ?? {};
    throw new AppError(ERROR_CODES.getRepoIssueByNumber, message);
  }

  return res.data as RepositoryIssue;
}

export type GithubIssuesApi = {
  getRepositoryIssues: (
    args: GetRepositoryIssuesArgs
  ) => Promise<RepositoryIssue[]>;
  getRepoIssueByNumber: (
    args: GetRepoIssueByNumberArgs
  ) => Promise<RepositoryIssue>;
};
