import React, { useCallback, useEffect, useState } from 'react';
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
  const { fetching, fetchData } = useFetch<FetchOutput>('/api/auth/logout');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (fetching == 'idle') {
      void fetchData();
    }

    if (fetching == 'success' || fetching == 'error') {
      storage.removeItem(jwtToken);
      loggedIn && dispatch(deleteSession());
      setIsLoading(false);
    }
  }, [fetching]);

  return isLoading ? null : <Redirect to="/auth/login" />;
};

export default Logout;
