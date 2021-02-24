import React from 'react';

import {
  RouteComponent,
  RouteComponentData,
} from '../../components/route/route.component';

const routes: RouteComponentData[] = [
  {
    exact: true,
    path: '/',
    redirectTo: '/login',
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
    path: '/recovery',
    component: 'auth/recovery.component.tsx',
  },
  {
    path: '/signup',
    component: 'auth/signup/signup.component.tsx',
  },
  {
    path: '*',
    component: 'notfound.component.tsx',
  },
];

export const AuthRouter: React.FC = (): JSX.Element => {
  return <RouteComponent routes={routes} />;
};
