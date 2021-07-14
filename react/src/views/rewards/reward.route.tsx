import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { Template } from '../../components/template/template.component';

const reward = lazy(() => import('./reward.component'));
const program = lazy(() => import('./reward.program'));
const notfound = lazy(() => import('../notfound.component'));

export const RewardRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Template name="rewards" component={reward} />
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
    component: 'rewards/dashboard/dashboard.component.tsx',
  },
  {
    path: '/:programId/claims/:id',
    component: 'rewards/claims/claim.form.tsx',
  },
  {
    path: '/:programId/claims',
    component: 'rewards/claims/claim.component.tsx',
  },
  {
    path: '/',
    component: 'rewards/rewards.component.tsx',
  },
];

export const RewardsRouter: React.FC = (): JSX.Element => {
  return <Routes routes={routes} />;
};
 */