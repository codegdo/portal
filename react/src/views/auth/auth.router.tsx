import React from 'react';

import { Routes } from '../../components/route/route.component';
import { RouteData } from '../../components/types';

const routes: RouteData[] = [
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
    path: '/register',
    component: 'auth/register/register.component.tsx',
  },
  {
    path: '/resend',
    component: 'auth/resend/resend.component.tsx',
  },
  {
    path: '/verify/:token',
    component: 'auth/verify/verify.component.tsx',
  },
  {
    path: '*',
    component: 'notfound.component.tsx',
  },
];

export const AuthRouter: React.FC = (): JSX.Element => {
  return <Routes routes={routes} />;
};
