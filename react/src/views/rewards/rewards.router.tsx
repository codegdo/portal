import React from 'react';

import { Routes } from '../../components/route/route.component';
import { RouteData } from '../../components/types';

const routes: RouteData[] = [
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
