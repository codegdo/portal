import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { deleteSession } from '../../../store/actions';

const LogoutComponent: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(deleteSession());
  });

  return <Redirect to="/auth/login" />;
};

export default LogoutComponent;
