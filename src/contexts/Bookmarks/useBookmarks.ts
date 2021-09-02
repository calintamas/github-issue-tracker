import React from 'react';

import { RepositoryIssue } from '../../api';

export type BookmarkedRepoIssue = RepositoryIssue & {
  owner: string;
  repo: string;
};

function useBookmarks() {
  const [bookmarks, setBookmarks] = React.useState<BookmarkedRepoIssue[]>([]);

  const addBookmark = React.useCallback((repoIssue: BookmarkedRepoIssue) => {
    setBookmarks((prevBookmarks) => [...prevBookmarks, repoIssue]);
  }, []);

  const removeBookmark = React.useCallback((issueId: number) => {
    setBookmarks((prevBookmarks) =>
      prevBookmarks.filter((repoIssue) => repoIssue.id !== issueId)
    );
  }, []);

  const isBookmarked = React.useCallback(
    (issueId: number) =>
      !!bookmarks.find((repoIssue) => repoIssue.id === issueId),
    [bookmarks]
  );

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked
  };
}

export { useBookmarks };
