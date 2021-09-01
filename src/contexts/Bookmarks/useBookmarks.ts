import React from 'react';

import { RepositoryIssue } from '../../api';

function useBookmarks() {
  const [bookmarks, setBookmarks] = React.useState<RepositoryIssue[]>([]);

  const addBookmark = React.useCallback((repoIssue: RepositoryIssue) => {
    setBookmarks((prevBookmarks) => [...prevBookmarks, repoIssue]);
  }, []);

  const removeBookmark = React.useCallback((repoIssueNumber: number) => {
    setBookmarks((prevBookmarks) =>
      prevBookmarks.filter((repoIssue) => repoIssue.number !== repoIssueNumber)
    );
  }, []);

  const isBookmarked = React.useCallback(
    (repoIssueNumber: number) =>
      !!bookmarks.find((repoIssue) => repoIssue.number === repoIssueNumber),
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
