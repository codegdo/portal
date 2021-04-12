import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { jwtToken } from '../../../app.config';
import { useFetch } from '../../../hooks';
import { storage } from '../../../services';
import { deleteSession } from '../../../store/actions';

interface HomeOutput {
  ok: boolean;
}

const Logout: React.FC = (): JSX.Element | null => {
  const dispatch = useDispatch();
  const { status, fetchData } = useFetch<HomeOutput>('/api/auth/logout');
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(async () => {
    fetchData();
  }, [status]);

  useEffect(() => {
    if (status == 'idle') {
      logout();
    }
    if (status == 'success' || status == 'error') {
      storage.removeItem(jwtToken);
      dispatch(deleteSession());
      setIsLoading(false);
    }
  }, [status]);

  return isLoading ? null : <Redirect to="/auth/login" />;
};

export default Logout;
