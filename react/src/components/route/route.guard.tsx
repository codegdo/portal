import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AppState } from '../../store/reducers';

export const RouteGuard: React.FC<RouteProps> = (props): JSX.Element => {
  const { loggedIn, orgId } = useSelector((state: AppState) => state.session);

  return loggedIn ? (orgId ? <Route {...props} /> : <Redirect to="/auth/configure" />) : <Redirect to="/auth/login" />;
};
