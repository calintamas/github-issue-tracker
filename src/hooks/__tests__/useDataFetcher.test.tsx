/* eslint-env jest */

import { renderHook } from '@testing-library/react-hooks';
import { act } from '@testing-library/react-native';

import { useDataFetcher } from '../useDataFetcher';

describe('test useDataFetcher hook', () => {
  it('successfully gets data', async () => {
    const res = {
      success: true,
      payload: {
        foo: 'bar'
      }
    };
    const mockFetcher = jest
      .fn()
      .mockImplementation(() => Promise.resolve(res));
    const onSuccess = jest.fn();
    const onError = jest.fn();

    const { result } = renderHook(() =>
      useDataFetcher(mockFetcher, {
        onSuccess,
        onError
      })
    );

    const { getData } = result.current;
    expect(result.current.data).toBe(undefined);
    expect(result.current.err).toBe(undefined);
    expect(result.current.loading).toBe(false);

    await act(() => getData());
    expect(result.current.data).toBe(res);
    expect(result.current.err).toBe(undefined);
    expect(result.current.loading).toBe(false);

    expect(onSuccess).toBeCalled();
    expect(onError).not.toBeCalled();
  });

  it('fails to get data', async () => {
    const err = new Error('Something went wrong');
    const mockFetcher = jest.fn().mockImplementation(() => Promise.reject(err));
    const onSuccess = jest.fn();
    const onError = jest.fn();

    const { result } = renderHook(() =>
      useDataFetcher(mockFetcher, {
        onSuccess,
        onError
      })
    );

    const { getData } = result.current;
    expect(result.current.data).toBe(undefined);
    expect(result.current.err).toBe(undefined);
    expect(result.current.loading).toBe(false);

    await act(() => getData());
    expect(result.current.data).toBe(undefined);
    expect(result.current.err).toBe(err);
    expect(result.current.loading).toBe(false);

    expect(onSuccess).not.toBeCalled();
    expect(onError).toBeCalled();
  });
});
