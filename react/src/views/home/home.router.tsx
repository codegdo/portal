import React from 'react';

import { Routes } from '../../components/route/route.component';
import { RouteData } from '../../components/types';

const routes: RouteData[] = [
  {
    path: '/',
    component: 'home/home.component.tsx',
  },
];

export const HomeRouter: React.FC = (): JSX.Element => {
  return <Routes routes={routes} />;
};
