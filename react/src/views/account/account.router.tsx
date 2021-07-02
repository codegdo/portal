import React from 'react';

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
