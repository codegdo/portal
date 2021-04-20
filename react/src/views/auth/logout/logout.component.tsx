import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { jwtToken } from '../../../app.config';
import { useFetch } from '../../../hooks';
import { storage } from '../../../services';
import { deleteSession } from '../../../store/actions';

interface FetchOutput {
  ok: boolean;
}

const Logout: React.FC = (): JSX.Element | null => {
  const dispatch = useDispatch();
  const { fetching, fetchData } = useFetch<FetchOutput>('/api/auth/logout');
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(async (): Promise<void> => {
    await fetchData();
  }, [fetching]);

  useEffect(() => {
    if (fetching == 'idle') {
      void logout();
    }
    if (fetching == 'success' || fetching == 'error') {
      storage.removeItem(jwtToken);
      dispatch(deleteSession());
      setIsLoading(false);
    }
  }, [logout]);

  return isLoading ? null : <Redirect to="/auth/login" />;
};

export default Logout;
