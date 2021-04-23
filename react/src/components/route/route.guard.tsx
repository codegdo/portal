import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AppState } from '../../store/reducers';

export const RouteGuard: React.FC<RouteProps> = (props): JSX.Element => {
  const loggedIn = useSelector((state: AppState) => state.session.loggedIn);
  return loggedIn ? <Route {...props} /> : <Redirect to="/auth/login" />;
};
