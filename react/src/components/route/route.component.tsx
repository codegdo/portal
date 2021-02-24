import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import { TemplateComponent } from '../template/template.component';
import { RouteGuard } from './route.guard';
import { RouteComponentProps } from './route.type';

export const RouteComponent: React.FC<RouteComponentProps> = ({
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
            <RouteGuard key={path} path={urlPath}>
              <TemplateComponent route={route} />
            </RouteGuard>
          ) : (
              <Route key={path} exact={exact} path={urlPath}>
                <TemplateComponent route={route} />
              </Route>
            );
        }
      )}
    </Switch>
  );
};
