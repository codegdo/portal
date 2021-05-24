import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { mapTemplateToLayout } from '../helpers';
import { AppState } from '../store/reducers';
import { useAction } from './action.hook';
import { useFetch } from './fetch.hook';

export const usePreload = (): any => {
  const subdomain = location.hostname.split('.')[1]
    ? window.location.host.split('.')[0]
    : false;
  const { fetching, result, isMounted, fetchData } = useFetch(
    `/api/preload/start?subdomain=${subdomain}`
  );
  const loggedIn = useSelector((state: AppState) => state.session.loggedIn);

  const { updateLayout } = useAction();

  const [sessionTimeout, setSessionTimeout] = useState(false);

  useEffect(() => {
    void fetchData();
  }, [loggedIn]);

  useEffect(() => {
    if (fetching == 'success') {
      if (isMounted.current) {
        const {
          data: { orgId, templates, user },
        } = result;

        if (orgId) {
          const layout = mapTemplateToLayout(templates);
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
