import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { Template } from '../../components/template/template.component';

const Admin = Template(lazy(() => import('./admin.component')));
const User = Template(lazy(() => import('./user/user.component')));
const NotFound = Template(lazy(() => import('../notfound.component')));

export const AdminRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Admin page="admin" />
    },
    {
      path: 'users',
      element: <User page="users" />,
    },
    {
      path: '*',
      element: <NotFound page="not-found" />
    },
  ]);

  return <>{routes}</>;
};



/* import React from 'react';

import { Routes } from '../../components/route/route.component';
import { RouteData } from '../../components/types';

const routes: RouteData[] = [
  {
    path: '/users',
    component: 'admin/user/user.component.tsx',
  },
  {
    path: '/',
    component: 'admin/admin.component.tsx',
  },
  {
    path: '*',
    component: 'notfound.component.tsx',
  },
];

export const AdminRouter: React.FC = (): JSX.Element => {
  return <Routes routes={routes} />;
};
 */