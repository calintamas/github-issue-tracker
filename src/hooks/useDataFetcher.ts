import React from 'react';

type State<DataType> = {
  data?: DataType;
  err?: Error;
  loading: boolean;
};

const initialState = {
  data: undefined,
  err: undefined,
  loading: false
};

type Options<DataType> = {
  onSuccess: (data: DataType) => void;
  onError: (err: Error) => void;
};

type Fetcher<DataType> = () => Promise<DataType>;

function useDataFetcher<DataType>(
  fetcher: Fetcher<DataType>,
  options?: Options<DataType>
) {
  const [state, setState] = React.useState<State<DataType>>(initialState);

  const getData = React.useCallback(async () => {
    try {
      setState((prevState) => ({
        ...prevState,
        loading: true
      }));
      const data = await fetcher();
      setState({
        ...initialState,
        data
      });
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    } catch (err) {
      setState({
        ...initialState,
        err
      });
      if (options?.onError) {
        options.onError(err);
      }
    }
  }, [fetcher, options]);

  const { data, err, loading } = state;

  return { getData, data, err, loading };
}

export { useDataFetcher };
