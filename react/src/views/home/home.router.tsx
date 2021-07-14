import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { Template } from '../../components/template/template.component';

const home = lazy(() => import('./home.component'));
const notfound = lazy(() => import('../notfound.component'));

export const HomeRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Template name="home" component={home} />
    },
    {
      path: '*',
      element: <Template name="not-found" component={notfound} />
    },
  ]);

  return <>{routes}</>;
};