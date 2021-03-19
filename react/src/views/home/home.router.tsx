import React from 'react';

import { RouteComponent } from '../../components/route/route.component';
import { RouteComponentData } from '../../components/types';

const routes: RouteComponentData[] = [
  {
    path: '/',
    component: 'home/home.component.tsx',
  },
];

export const HomeRouter: React.FC = (): JSX.Element => {
  return <RouteComponent routes={routes} />;
};
