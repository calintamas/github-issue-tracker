/* eslint-env jest */

import { act, renderHook } from '@testing-library/react-hooks';

import { BookmarkedRepoIssue, useBookmarks } from '../useBookmarks';

const mockRepoIssue: BookmarkedRepoIssue = {
  id: 10,
  created_at: 'mock-created-at',
  updated_at: 'mock-updated-at',
  state: 'open',
  title: 'Mock Issue',
  body: 'This is a mock issue',
  url: 'http://mock-url',
  number: 120,
  comments: 0,
  owner: 'mock-owner',
  repo: 'mock-repo'
};

const setup = () => {
  const utils = renderHook(useBookmarks);
  return {
    ...utils
  };
};

describe('test useBookmarks hook', () => {
  it('returns defaults', () => {
    const { result } = setup();
    expect(result.current.bookmarks).toEqual([]);
  });

  it('adds RepoIssue to bookmarks', () => {
    const { result } = setup();

    act(() => {
      result.current.addBookmark(mockRepoIssue);
    });
    expect(result.current.bookmarks).toEqual([mockRepoIssue]);
  });

  it('removes RepoIssue from bookmarks', () => {
    const { result } = setup();

    act(() => {
      result.current.addBookmark(mockRepoIssue);
    });
    expect(result.current.bookmarks).toEqual([mockRepoIssue]);

    act(() => {
      result.current.removeBookmark(mockRepoIssue.id);
    });
    expect(result.current.bookmarks).toEqual([]);
  });

  it('returns true if RepoIssue is bookmarked', () => {
    const { result } = setup();

    act(() => {
      result.current.addBookmark(mockRepoIssue);
    });
    expect(result.current.isBookmarked(mockRepoIssue.id)).toBe(true);
  });

  it('returns false if RepoIssue is NOT bookmarked', () => {
    const { result } = setup();

    expect(result.current.isBookmarked(mockRepoIssue.id)).toBe(false);
  });
});
