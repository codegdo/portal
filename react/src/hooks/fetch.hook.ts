import { useCallback, useEffect, useReducer } from 'react';
import { apiUrl, jwtToken } from '../app.config';

import { http, RequestOption } from '../services';
import { stripTrailingSlash } from '../utils';

type FetchConfig = {
  option?: { [key: string]: any };
  setting?: { [key: string]: any };
};

type FetchState<T> = {
  fetching: 'idle' | 'loading' | 'error' | 'success';
  data?: T;
};

type FetchOutput<T> = FetchState<T> & {
  fetchData: (configs?: FetchConfig) => Promise<void>;
};

type Action<T> =
  | { type: 'REQUEST' }
  | { type: 'SUCCESS'; payload: T }
  | { type: 'FAILURE'; payload: T };

export const useFetch = <T>(
  endpoint: string,
  { baseUrl, init, ...rest }: RequestOption = {}
): FetchOutput<any> => {
  const token = window.localStorage.getItem(jwtToken);
  const url = baseUrl
    ? stripTrailingSlash(`${baseUrl}/${endpoint}`)
    : stripTrailingSlash(`${apiUrl}/${endpoint}`);

  if (token) {
    const { headers } = rest;
    rest.headers = { Authorization: `Bearer ${token}`, ...headers };
  }

  const initialState: FetchState<T> = {
    fetching: 'idle',
    data: undefined,
  };

  const fetchReducer = <T>(
    state: FetchState<T>,
    action: Action<T>
  ): FetchState<T> => {
    switch (action.type) {
      case 'REQUEST':
        return { ...state, fetching: 'loading' };
      case 'SUCCESS':
        return { ...state, fetching: 'success', data: action.payload };
      case 'FAILURE':
        return { ...state, fetching: 'error', data: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  const fetchData = useCallback(
    async (config: FetchConfig = { option: {}, setting: {} }): Promise<void> => {
      const { option, setting } = config;

      if (!endpoint) {
        return;
      }

      dispatch({ type: 'REQUEST' });

      try {
        const data = await http.request(url, {
          ...rest,
          ...option,
        });

        dispatch({ type: 'SUCCESS', payload: { ...data, ok: true, ...setting } });
      } catch (error) {
        dispatch({ type: 'FAILURE', payload: { ...error, ok: false, ...setting } });
      }
    },
    [endpoint]
  );

  useEffect(() => {
    if (!init) {
      return;
    }
    void fetchData();
  }, [fetchData]);

  return { ...state, fetchData };
};
