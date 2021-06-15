import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { mapTemplate } from '../helpers';
import { AppState } from '../store/reducers';
import { useAction } from './action.hook';
import { useFetch } from './fetch.hook';

type IResultData = {
  user: { [key: string]: string };
  orgId: string | number;
  templates: [];
};

export const usePreload = (): { preload; sessionTimeout: boolean } => {
  console.log(location.hostname);
  const subdomain = location.hostname.split('.')[1]
    ? window.location.host.split('.')[0]
    : '';
  const { fetching, result, isMounted, fetchData } = useFetch<IResultData>(
    `/api/preload/start?subdomain=${subdomain}`
  );
  const loggedIn = useSelector((state: AppState) => state.session.loggedIn);

  const { updateLayout } = useAction();

  const [sessionTimeout, setSessionTimeout] = useState(false);

  useEffect(() => {
    void fetchData();
  }, [loggedIn]);

  useEffect(() => {
    if (fetching == 'success' && result) {
      if (isMounted.current) {
        const {
          data: { user, templates },
        } = result;

        if (templates.length > 0) {
          const layout = mapTemplate(templates);
          updateLayout({ ...layout });
        }

        // check if session timeout
        if (loggedIn) {
          !user && setSessionTimeout(true);
        } else {
          setSessionTimeout(false);
        }
      }
    }
  }, [fetching]);

  return {
    preload: result,
    sessionTimeout,
  };
};
