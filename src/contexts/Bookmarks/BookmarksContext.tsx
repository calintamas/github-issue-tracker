import React from 'react';

import { ReactChildren } from '../../types';
import { BookmarkedRepoIssue, useBookmarks } from './useBookmarks';

export type BookmarksContextType = {
  bookmarks: BookmarkedRepoIssue[];
  addBookmark: (repoIssue: BookmarkedRepoIssue) => void;
  removeBookmark: (repoIssueNumber: number) => void;
  isBookmarked: (repoIssueNumber: number) => boolean;
};

const BookmarksContext = React.createContext<BookmarksContextType | undefined>(
  undefined
);

export type BookmarksContextProviderProps = {
  children: ReactChildren;
};

function BookmarksProvider({
  children
}: BookmarksContextProviderProps): JSX.Element {
  const { bookmarks, ...bookmarkMethods } = useBookmarks();

  const value = {
    bookmarks,
    ...bookmarkMethods
  };

  return (
    <BookmarksContext.Provider value={value}>
      {children}
    </BookmarksContext.Provider>
  );
}

function useBookmarksContext(): BookmarksContextType {
  const ctx = React.useContext(BookmarksContext);
  if (!ctx) {
    throw new Error(
      `useBookmarksContext() must be called within BookmarksContext`
    );
  }
  return ctx;
}

export { BookmarksProvider, useBookmarksContext };
