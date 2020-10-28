import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';

import { TemplateComponent } from '../template/template.component';
import { RouteGuard } from './route.guard';

export interface RouteComponentData {
  path: string;
  component?: string;
  redirectTo?: string;
  restricted?: boolean;
  data?: { x: string };
}

export interface RouteComponentProps {
  routes: RouteComponentData[];
}

export const RouteComponent: React.FC<RouteComponentProps> = ({
  routes,
}): JSX.Element => {
  const { url } = useRouteMatch();

  return (
    <Switch>
      {routes.map(
        (route): JSX.Element => {
          const { path, redirectTo, restricted } = route;

          return redirectTo ? (
            <Redirect key={path} from={path || '/'} to={url + redirectTo} />
          ) : restricted ? (
            <RouteGuard key={path} path={url + path}>
              <TemplateComponent route={route} />
            </RouteGuard>
          ) : (
                <Route key={path} path={url + path}>
                  <TemplateComponent route={route} />
                </Route>
              );
        }
      )}
    </Switch>
  );
};
