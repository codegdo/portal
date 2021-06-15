import { useCallback, useEffect, useReducer, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { apiUrl, jwtToken } from '../app.config';

import { http, RequestOption } from '../services';
import { stripTrailingSlash } from '../utils';

export type FetchConfig = {
  option?: { [key: string]: any };
  detail?: { [key: string]: any };
};

type FetchState<T> = {
  fetching: 'idle' | 'loading' | 'error' | 'success';
  result?: T;
};

type Action<T> =
  | { type: 'REQUEST' }
  | { type: 'SUCCESS'; payload: T }
  | { type: 'FAILURE'; payload: T };

export type FetchResult<T> = {
  data: T;
  detail: T;
  ok: boolean;
  status: number;
};

type FetchReturn<T> = {
  fetching: 'idle' | 'loading' | 'error' | 'success';
  result: FetchResult<T>;
  isMounted: React.MutableRefObject<boolean>;
  fetchData: (configs?: FetchConfig) => Promise<void>;
};

export const useFetch = <T>(
  endpoint: string,
  { baseUrl, init, ...rest }: RequestOption = {}
): FetchReturn<T> => {
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
    result: undefined,
  };

  const fetchReducer = <T>(
    state: FetchState<T>,
    action: Action<T>
  ): FetchState<T> => {
    switch (action.type) {
      case 'REQUEST':
        return { ...state, fetching: 'loading' };
      case 'SUCCESS':
        return { ...state, fetching: 'success', result: action.payload };
      case 'FAILURE':
        return { ...state, fetching: 'error', result: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  const history = useHistory();

  const isMounted = useRef(false);

  const fetchData = useCallback(
    async (config: FetchConfig = { option: {}, detail: {} }): Promise<void> => {
      const { option, detail } = config;

      if (!endpoint) {
        return;
      }

      dispatch({ type: 'REQUEST' });

      try {
        const data = await http.request(url, {
          ...rest,
          ...option,
        });

        dispatch({ type: 'SUCCESS', payload: { ...data, ok: true, detail } });
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const status: number = error.status;

        if (error.message === 'Failed to fetch') {
          dispatch({
            type: 'FAILURE',
            payload: {
              data: { message: 'Failed to fetch' },
              ok: false,
              status,
              detail,
            },
          });
        } else if (error.data.message === 'Session timeout') {
          history.push('/auth/logout');
        } else {
          dispatch({
            type: 'FAILURE',
            payload: { ...error, ok: false, status, detail },
          });
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

  useEffect((): (() => void) => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);

  return { fetching: state.fetching, result: state.result, isMounted, fetchData };
};
