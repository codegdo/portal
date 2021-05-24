import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { jwtToken } from '../../../app.config';
import { useFetch } from '../../../hooks';
import { storage } from '../../../services';
import { deleteSession } from '../../../store/actions';
import { AppState } from '../../../store/reducers';

interface FetchOutput {
  ok: boolean;
}

const Logout: React.FC = (): JSX.Element | null => {
  const loggedIn = useSelector((state: AppState) => state.session.loggedIn);
  const dispatch = useDispatch();
  const { fetching, result, isMounted, fetchData } = useFetch<FetchOutput>('/api/auth/logout');

  useEffect(() => {
    console.log('FETCHING', fetching);
    console.log('RESULT', result)
    console.log('LOGIN', loggedIn);

    if (result) {
      if (isMounted.current) {
        storage.removeItem(jwtToken);
        loggedIn && dispatch(deleteSession());
      }
    }
  }, [result]);

  useEffect(() => {
    loggedIn && void fetchData();
  }, []);

  return loggedIn ? null : <Redirect to="/auth/login" />;
};

export default Logout;
