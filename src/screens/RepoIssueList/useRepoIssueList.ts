import React from 'react';

import { RepositoryIssueStatus } from '../../api';
import { useGithubApiContext } from '../../contexts/GithubApi';
import { useFilterList } from '../../hooks/useFilterList';

export type RepoIssueFilters = {
  owner?: string;
  repo?: string;
  page?: number;
  perPage?: number;
  status?: RepositoryIssueStatus;
};

const INITIAL_PAGE = 1;

function useRepoIssueList(initialFilters: RepoIssueFilters) {
  const { getRepositoryIssues } = useGithubApiContext();

  const { setFilters, filters, data, isLoadingMoreData, isRefreshingData } =
    useFilterList(getRepositoryIssues, initialFilters);

  const loadNextPage = React.useCallback(() => {
    setFilters(
      {
        page: (filters.page ?? INITIAL_PAGE) + 1
      },
      'loadMore'
    );
  }, [filters.page, setFilters]);

  const refreshIssues = React.useCallback(() => {
    setFilters({
      ...filters,
      page: INITIAL_PAGE
    });
  }, [filters, setFilters]);

  const showAllIssues = React.useCallback(() => {
    setFilters({
      status: 'all',
      page: INITIAL_PAGE
    });
  }, [setFilters]);

  const showClosedIssues = React.useCallback(() => {
    setFilters({
      status: 'closed',
      page: INITIAL_PAGE
    });
  }, [setFilters]);

  const showOpenIssues = React.useCallback(() => {
    setFilters({
      status: 'open',
      page: INITIAL_PAGE
    });
  }, [setFilters]);

  return {
    filters,
    data,
    isLoadingMoreData,
    isRefreshingData,
    loadNextPage,
    showAllIssues,
    showClosedIssues,
    showOpenIssues,
    refreshIssues
  };
}

export { useRepoIssueList };
