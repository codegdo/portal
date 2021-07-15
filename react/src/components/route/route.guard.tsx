import React from 'react';
import { RouteProps } from 'react-router';
import { Navigate, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AppState } from '../../store/reducers';

export const RouteGuard: React.FC<RouteProps> = (props): JSX.Element => {
  const { loggedIn, orgId } = useSelector((state: AppState) => state.session);

  return loggedIn ?
    (
      orgId ?
        <Route {...props} /> :
        <Navigate to="/auth/configure" />
    ) :
    <Navigate to="/auth/login" />;
};
