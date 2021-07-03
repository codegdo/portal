import React from 'react';

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
