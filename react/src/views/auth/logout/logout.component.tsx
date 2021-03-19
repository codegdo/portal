import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { jwtToken } from '../../../app.config';
import { useFetch } from '../../../hooks';
import { storage } from '../../../services';
import { deleteSession } from '../../../store/actions';

interface HomeOutput {
  ok: boolean;
}

const LogoutComponent: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { fetchData } = useFetch<HomeOutput>('/api/auth/logout');

  useEffect(() => {
    (async () => {
      fetchData();
    })();
    storage.removeItem(jwtToken);
    dispatch(deleteSession());
  });

  return <Redirect to="/auth/login" />;
};

export default LogoutComponent;
