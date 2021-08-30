/* eslint-env jest */

import { act, renderHook } from '@testing-library/react-hooks';

import { useFilterList } from '../useFilterList';

type Filters = {
  sort: 'asc' | 'desc';
};

type Data = {
  foo: string;
};

const successfulFetcher = jest.fn((filters: Filters) =>
  Promise.resolve([
    {
      foo: filters.sort === 'asc' ? 'bar' : 'baz'
    }
  ])
);

const failingFetcher = jest.fn(() => Promise.reject(new Error()));

const setup = (
  fetcher: (filters: Filters) => Promise<Data[]>,
  filters?: Filters
) => {
  const initialFilters: Filters = {
    sort: 'asc',
    ...filters
  };
  const utils = renderHook(() => useFilterList(fetcher, initialFilters));

  return {
    initialFilters,
    ...utils
  };
};

describe('test useFilterList hook', () => {
  it('returns defaults', async () => {
    const { result, waitForNextUpdate } = setup(successfulFetcher);

    expect(result.current.isRefreshingData).toBe(true);

    await waitForNextUpdate();
    expect(result.current.data).toEqual([{ foo: 'bar' }]);
    expect(result.current.isRefreshingData).toBe(false);
    expect(result.current.isLoadingMoreData).toBe(false);
  });

  describe('update procedure is `refresh`', () => {
    it('sets a new filter, fetches new data', async () => {
      const { result, waitForNextUpdate } = setup(successfulFetcher);

      await waitForNextUpdate();
      expect(result.current.data).toEqual([{ foo: 'bar' }]);

      await act(async () => {
        await result.current.setFilters({
          sort: 'desc'
        });
      });

      expect(result.current.data).toEqual([{ foo: 'baz' }]);
    });

    it('fails to fetch new data', async () => {
      const { result, waitForNextUpdate } = setup(failingFetcher);

      await waitForNextUpdate();
      expect(result.current.data).toEqual([]);
    });
  });

  describe('update procedure is `loadMore`', () => {
    it('sets a new filter, fetches new data', async () => {
      const { result, waitForNextUpdate } = setup(successfulFetcher);

      await waitForNextUpdate();
      expect(result.current.data).toEqual([{ foo: 'bar' }]);

      await act(async () => {
        await result.current.setFilters(
          {
            sort: 'desc'
          },
          'loadMore'
        );
      });

      expect(result.current.data).toEqual([{ foo: 'bar' }, { foo: 'baz' }]);
    });

    it('fails to fetch new data', async () => {
      const { result, waitForNextUpdate } = setup(failingFetcher);

      await waitForNextUpdate();
      expect(result.current.data).toEqual([]);

      await act(async () => {
        await result.current.setFilters(
          {
            sort: 'desc'
          },
          'loadMore'
        );
      });
      expect(result.current.data).toEqual([]);
    });
  });
});
