import React from 'react';

type State<D, F> = {
  data: D[];
  filters: F;
  isLoadingMoreData: boolean;
  isRefreshingData: boolean;
};

type Action<D, F> =
  | { type: 'load_more_data_pending' }
  | { type: 'load_more_data_success'; payload: D[] }
  | { type: 'load_more_data_error' }
  | { type: 'refresh_data_pending' }
  | { type: 'refresh_data_success'; payload: D[] }
  | { type: 'refresh_data_error' }
  | { type: 'set_filters'; payload: F };

type Reducer<D, F> = (
  prevState: State<D, F>,
  action: Action<D, F>
) => State<D, F>;

function reducer<D, F>(state: State<D, F>, action: Action<D, F>): State<D, F> {
  switch (action.type) {
    case 'load_more_data_pending':
      return {
        ...state,
        isLoadingMoreData: true
      };

    case 'load_more_data_success':
      return {
        ...state,
        isLoadingMoreData: false,
        data: [...state.data, ...action.payload]
      };

    case 'load_more_data_error':
      return {
        ...state,
        isLoadingMoreData: false
      };

    case 'refresh_data_pending': {
      return {
        ...state,
        isRefreshingData: true
      };
    }

    case 'refresh_data_success': {
      return {
        ...state,
        isRefreshingData: false,
        data: action.payload
      };
    }

    case 'refresh_data_error':
      return {
        ...state,
        isRefreshingData: false
      };

    case 'set_filters':
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      };

    default:
      throw new Error(`Action type is not supported`);
  }
}

type UpdateProcedure = 'loadMore' | 'refresh';

/**
 * Takes a fetcher function and some initialFilters as params.
 *
 * Fetches new data when current `filters` change.
 * Current `filters` can be changed via the exposed `setFilters` function.
 *
 * Data is updated in two ways:
 *    1. `refresh` - replace existing data with new data
 *    2. `loadMore` - append new data to existing data
 */
function useFilterList<DataType, FiltersType>(
  fetcher: (filters: FiltersType) => Promise<DataType[]>,
  initialFilters: FiltersType
) {
  const [state, dispatch] = React.useReducer<Reducer<DataType, FiltersType>>(
    reducer,
    {
      data: [],
      filters: initialFilters,
      isLoadingMoreData: false,
      isRefreshingData: false
    }
  );
  const updateProcedure = React.useRef<UpdateProcedure>('refresh');

  const refreshData = React.useCallback(async () => {
    try {
      dispatch({
        type: 'refresh_data_pending'
      });
      const data = await fetcher(state.filters);
      dispatch({
        type: 'refresh_data_success',
        payload: data
      });
    } catch (err) {
      dispatch({
        type: 'refresh_data_error'
      });
    }
  }, [fetcher, state.filters]);

  const loadMoreData = React.useCallback(async () => {
    try {
      dispatch({
        type: 'load_more_data_pending'
      });
      const data = await fetcher(state.filters);
      dispatch({
        type: 'load_more_data_success',
        payload: data
      });
    } catch (err) {
      dispatch({
        type: 'load_more_data_error'
      });
    }
  }, [fetcher, state.filters]);

  const setFilters = React.useCallback(
    (filters: FiltersType, method: UpdateProcedure = 'refresh') => {
      updateProcedure.current = method;
      dispatch({
        type: 'set_filters',
        payload: filters
      });
    },
    []
  );

  React.useEffect(() => {
    if (updateProcedure.current === 'loadMore') {
      loadMoreData();
    } else {
      refreshData();
    }
  }, [loadMoreData, refreshData]);

  return {
    ...state,
    setFilters
  };
}

export { useFilterList };
