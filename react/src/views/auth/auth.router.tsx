import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { Template } from '../../components/template/template.component';

const Auth = Template(lazy(() => import('./auth.component')));
const NotFound = Template(lazy(() => import('../notfound.component')));

export const AuthRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/*',
      element: <Auth name="auth" />
    },
    {
      path: '*',
      element: <NotFound name="not-found" />
    },
  ]);

  return <>{routes}</>;
}