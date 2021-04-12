import { useCallback, useEffect, useReducer } from 'react';
import { apiUrl, jwtToken } from '../app.config';

import { http, RequestOptions } from '../services';
import { stripTrailingSlash } from '../utils';

interface FetchState<T> {
  fetching: 'idle' | 'loading' | 'error' | 'success';
  data?: T;
}

interface FetchOutput<T> extends FetchState<T> {
  fetchData: <T>(configs?: T) => Promise<void>;
}

type Action<T> =
  | { type: 'REQUEST' }
  | { type: 'SUCCESS'; payload: T }
  | { type: 'FAILURE'; payload: T };

export const useFetch = <T>(
  endpoint: string,
  { baseUrl, init = false, ...rest }: RequestOptions = {}
): FetchOutput<T> => {
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
  ): FetchState<any> => {
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
    async (configs = {}): Promise<void> => {
      const { options, settings } = configs;

      if (!endpoint) {
        return;
      }

      dispatch({ type: 'REQUEST' });

      try {
        const { ok, status, data = {} } = await http.request(url, {
          ...rest,
          ...options,
        });

        dispatch({ type: 'SUCCESS', payload: { ok, status, ...data, ...settings } });
      } catch (error) {
        const { ok, status, data = {} } = error;
        dispatch({ type: 'FAILURE', payload: { ok, status, ...data, ...settings } });
      }
    },
    [endpoint]
  );

  useEffect(() => {
    if (!init) {
      return;
    }
    fetchData();
  }, [endpoint]);

  return { ...state, fetchData };
};
