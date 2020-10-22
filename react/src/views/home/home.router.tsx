import React from 'react';

import {
  RouteComponent,
  RouteComponentData,
} from '../../components/route/route.component';

const routes: RouteComponentData[] = [
  {
    path: '/',
    component: '/home/home.component.tsx',
  },
];

export const HomeRouter: React.FC = (): JSX.Element => {
  return <RouteComponent routes={routes} />;
};
