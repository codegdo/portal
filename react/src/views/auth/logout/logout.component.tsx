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
  const { result, isMounted, fetchData } = useFetch<FetchOutput>('/api/auth/logout');

  useEffect(() => {
    if (loggedIn && result) {
      if (isMounted.current) {
        storage.removeItem(jwtToken);
        dispatch(deleteSession());
      }
    }
  }, [result]);

  useEffect(() => {
    loggedIn && void fetchData();
  }, []);

  return loggedIn ? <div>logging out...</div> : <Redirect to="/auth/login" />;
};

export default Logout;
