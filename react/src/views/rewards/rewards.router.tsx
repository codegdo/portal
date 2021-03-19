import React from 'react';

import { RouteComponent } from '../../components/route/route.component';
import { RouteComponentData } from '../../components/types';

const routes: RouteComponentData[] = [
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
  return <RouteComponent routes={routes} />;
};
