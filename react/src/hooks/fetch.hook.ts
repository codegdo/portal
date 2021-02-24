import { useCallback, useEffect, useReducer } from 'react';
import { apiUrl, jwtToken } from '../app.config';

import { http, RequestOptions } from '../services';
import { stripTrailingSlash } from '../utils';

interface FetchState<T> {
  status: 'idle' | 'loading' | 'error' | 'success';
  data?: T;
  error?: T;
}

interface FetchOutput<T> extends FetchState<T> {
  fetchData: <T>(options: T) => Promise<void>;
}

type Action<T> =
  | { type: 'REQUEST' }
  | { type: 'SUCCESS'; payload: T }
  | { type: 'FAILURE'; payload: T };

export const useFetch = <T>(
  endpoint: string,
  { baseUrl, fetching = false, ...rest }: RequestOptions = {}
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
    status: 'idle',
    data: undefined,
    error: undefined,
  };

  const fetchReducer = <T>(
    state: FetchState<T>,
    action: Action<T>
  ): FetchState<any> => {
    switch (action.type) {
      case 'REQUEST':
        return { ...state, status: 'loading' };
      case 'SUCCESS':
        return { ...state, status: 'success', data: action.payload };
      case 'FAILURE':
        return { ...state, status: 'error', error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  const fetchData = useCallback(
    async (options: RequestOptions = {}) => {
      if (!endpoint) {
        return;
      }
      dispatch({ type: 'REQUEST' });
      try {
        const res = await http.request(url, { ...rest, ...options });
        dispatch({ type: 'SUCCESS', payload: res.data });
      } catch (error) {
        dispatch({ type: 'FAILURE', payload: error.data });
      }
    },
    [endpoint]
  );

  useEffect(() => {
    if (!fetching) {
      return;
    }
    fetchData();
  }, [endpoint]);

  return { ...state, fetchData };
};
