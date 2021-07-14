import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { Template } from '../../components/template/template.component';

//import Internal from './user/internal.component';
//import External from './user/internal.component';

const admin = lazy(() => import('./admin.component'));
const user = lazy(() => import('./user/user.component'));
const notfound = lazy(() => import('../notfound.component'));

export const AdminRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Template name="admin" component={admin} />
    },
    {
      path: 'users',
      element: <Template name="users" component={user} />,
      /* children: [
        {
          path: 'internal',
          element: <Internal />
        },
        {
          path: 'external',
          element: <External />
        }
      ] */
    },
    {
      path: '*',
      element: <Template name="not-found" component={notfound} />
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