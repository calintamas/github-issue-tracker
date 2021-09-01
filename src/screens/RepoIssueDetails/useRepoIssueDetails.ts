import React from 'react';

import { useGithubApi } from '../../contexts';
import { useDataFetcher } from '../../hooks/useDataFetcher';

export type RepoIssueArgs = {
  owner: string;
  repo: string;
  issueNumber: number;
};

function useRepoIssueDetails({ owner, repo, issueNumber }: RepoIssueArgs) {
  const { getRepoIssueByNumber } = useGithubApi();

  const fetcher = React.useCallback(
    () =>
      getRepoIssueByNumber({
        owner,
        repo,
        issueNumber
      }),
    [getRepoIssueByNumber, issueNumber, owner, repo]
  );

  const { data, loading, err, getData } = useDataFetcher(fetcher);

  React.useEffect(() => {
    getData();
  }, [getData]);

  return {
    data,
    loading,
    err
  };
}

export { useRepoIssueDetails };
