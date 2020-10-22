import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AppState } from '../../store/types';

export const RouteGuard: React.FC<RouteProps> = ({
  children,
  ...rest
}): JSX.Element => {
  const loggedIn = useSelector((state: AppState) => state.session.loggedIn);

  return (
    <Route
      {...rest}
      render={() => {
        return loggedIn ? <>{children}</> : <Redirect to="/auth" />;
      }}
    />
  );
};
