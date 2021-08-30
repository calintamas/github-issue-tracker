import React from 'react';

import { RepositoryIssueStatus } from '../api';
import { useGithubApi } from '../contexts/GithubApi';
import { useFilterList } from './useFilterList';

export type RepoIssueFilters = {
  owner?: string;
  repo?: string;
  page?: number;
  perPage?: number;
  status?: RepositoryIssueStatus;
};

function useRepoIssueList(initialFilters: RepoIssueFilters) {
  const { getRepositoryIssues } = useGithubApi();

  const { setFilters, filters, data, isLoadingMoreData, isRefreshingData } =
    useFilterList(getRepositoryIssues, initialFilters);

  const loadNextPage = React.useCallback(() => {
    setFilters(
      {
        page: (filters.page ?? 1) + 1
      },
      'loadMore'
    );
  }, [filters.page, setFilters]);

  const refreshIssues = React.useCallback(() => {
    setFilters({
      ...filters,
      page: 1
    });
  }, [filters, setFilters]);

  const showAllIssues = React.useCallback(() => {
    setFilters({
      status: 'all'
    });
  }, [setFilters]);

  const showClosedIssues = React.useCallback(() => {
    setFilters({
      status: 'closed'
    });
  }, [setFilters]);

  const showOpenIssues = React.useCallback(() => {
    setFilters({
      status: 'open'
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
