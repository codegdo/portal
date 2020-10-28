import React from 'react';

import {
  RouteComponent,
  RouteComponentData,
} from '../../components/route/route.component';

const routes: RouteComponentData[] = [
  {
    path: '/login/recovery',
    component: 'auth/login/login.recovery.tsx',
  },
  {
    path: '/login',
    component: 'auth/login/login.component.tsx',
  },
  {
    path: '/logout',
    component: 'auth/logout/logout.component.tsx',
  },
  {
    path: '/signup',
    component: 'auth/signup/signup.component.tsx',
  },
  {
    path: '/',
    redirectTo: '/login',
  },
];

export const AuthRouter: React.FC = (): JSX.Element => {
  return <RouteComponent routes={routes} />;
};
