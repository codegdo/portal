import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { Template } from '../../components/template/template.component';

const account = lazy(() => import('./account.component'));
const profile = lazy(() => import('./profile/profile.component'));
const subscription = lazy(() => import('./subscription/subscription.component'));
const notfound = lazy(() => import('../notfound.component'));

export const AccountRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Template name="account" component={account} />
    },
    {
      path: 'profile',
      element: <Template name="profile" component={profile} />
    },
    {
      path: 'subscription',
      element: <Template name="subscription" component={subscription} />
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
    path: '/profile',
    component: 'account/profile/profile.component.tsx',
  },
  {
    path: '/subscription',
    component: 'account/subscription/subscription.component.tsx',
  },
  {
    path: '/',
    component: 'account/account.component.tsx',
  }
];

export const AccountRouter: React.FC = (): JSX.Element => {
  return <Routes routes={routes} />;
};
 */