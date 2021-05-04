import { useCallback, useEffect, useReducer, useRef } from 'react';
import { apiUrl, jwtToken } from '../app.config';

import { http, RequestOption } from '../services';
import { stripTrailingSlash } from '../utils';

type FetchConfig = {
  option?: { [key: string]: any };
  setting?: { [key: string]: any };
};

type FetchState<T> = {
  fetching: 'idle' | 'loading' | 'error' | 'success';
  response?: T;
};

type FetchOutput<T> = FetchState<T> & {
  isMounted: React.MutableRefObject<boolean>;
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
    response: undefined,
  };

  const fetchReducer = <T>(
    state: FetchState<T>,
    action: Action<T>
  ): FetchState<T> => {
    switch (action.type) {
      case 'REQUEST':
        return { ...state, fetching: 'loading' };
      case 'SUCCESS':
        return { ...state, fetching: 'success', response: action.payload };
      case 'FAILURE':
        return { ...state, fetching: 'error', response: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  const isMounted = useRef(false);

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

        dispatch({ type: 'SUCCESS', payload: { ...data, ok: true, setting } });
      } catch (error) {
        if (error.message === 'Failed to fetch') {
          dispatch({
            type: 'FAILURE',
            payload: { data: { message: 'Failed to fetch' }, ok: false, setting },
          });
        } else {
          dispatch({ type: 'FAILURE', payload: { ...error, ok: false, setting } });
        }
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

  useEffect((): any => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);

  return { ...state, isMounted, fetchData };
};
