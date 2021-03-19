import React from 'react';

import { RouteComponent } from '../../components/route/route.component';
import { RouteComponentData } from '../../components/types';

const routes: RouteComponentData[] = [
  {
    path: '/:programId/dashboard',
    component: 'sales/dashboard/dashboard.component.tsx',
  },
  {
    path: '/:programId/deals/:id',
    component: 'sales/deals/deal.form.tsx',
  },
  {
    path: '/:programId/deals',
    component: 'sales/deals/deal.component.tsx',
  },
  {
    path: '/',
    component: 'sales/sales.component.tsx',
  },
];

export const SalesRouter: React.FC = (): JSX.Element => {
  return <RouteComponent routes={routes} />;
};
