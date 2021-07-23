import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { jwtToken } from '../../../app.config';
import { useAction, useFetch } from '../../../hooks';
import { storage } from '../../../services';
import { AppState } from '../../../store/reducers';

interface FetchOutput {
  ok: boolean;
}

const Logout: React.FC = (): JSX.Element | null => {
  const loggedIn = useSelector((state: AppState) => state.session.loggedIn);
  const { deleteSession } = useAction();
  const { result, fetchData } = useFetch<FetchOutput>('/api/auth/logout');

  useEffect(() => {
    if (result) {
      storage.removeItem(jwtToken);
      deleteSession();
    }
  }, [result]);

  useEffect(() => {
    loggedIn && void fetchData();
  }, []);

  return loggedIn ? <div>logging out...</div> : <Navigate to="/" />;
};

export default Logout;
