import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import { Template } from '../template/template.component';
import { RouteGuard } from './route.guard';
import { RoutesProps } from './route.type';

export const Routes: React.FC<RoutesProps> = ({
  routes,
}): JSX.Element => {
  const { url } = useRouteMatch();

  return (
    <Switch>
      {routes.map(
        (route): JSX.Element => {
          const { exact, path = '/', restricted } = route;
          const urlPath: string = (url + path).replace(/\/\//g, '/');

          return restricted ? (
            <RouteGuard key={path} path={urlPath} render={props => <Template {...props} route={route} />} />
          ) : (
            <Route key={path} exact={exact} path={urlPath} render={props => <Template {...props} route={route} />} />
          );
        }
      )}
    </Switch>
  );
};
