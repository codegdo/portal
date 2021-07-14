import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { Template } from '../../components/template/template.component';

const marketing = lazy(() => import('./marketing.component'));
const program = lazy(() => import('./marketing.program'));
const notfound = lazy(() => import('../notfound.component'));

export const MarketingRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Template name="marketing" component={marketing} />
    },
    {
      path: ':id',
      element: <Template name="program" component={program} />
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
    exact: true,
    path: '/:programId',
    redirectTo: '/dashboard'
  },
  {
    path: '/:programId/dashboard',
    component: 'marketing/dashboard/dashboard.component.tsx',
  },
  {
    path: '/:programId/requests/:id',
    component: 'marketing/requests/request.form.tsx',
  },
  {
    path: '/:programId/requests',
    component: 'marketing/requests/request.component.tsx',
  },
  {
    path: '/:programId/claims/:id',
    component: 'marketing/claims/claim.form.tsx',
  },
  {
    path: '/:programId/claims',
    component: 'marketing/claims/claim.component.tsx',
  },
  {
    path: '/:programId/payments/:id',
    component: 'marketing/payments/payment.form.tsx',
  },
  {
    path: '/:programId/payments',
    component: 'marketing/payments/payment.component.tsx',
  },
  {
    path: '/',
    component: 'marketing/marketing.component.tsx',
  },
];

export const MarketingRouter: React.FC = (): JSX.Element => {
  return <Routes routes={routes} />;
};
 */