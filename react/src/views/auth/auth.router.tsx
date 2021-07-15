import React, { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { Template } from '../../components/template/template.component';

const login = lazy(() => import('./login/login.component'));
const logout = lazy(() => import('./logout/logout.component'));
const signup = lazy(() => import('./signup/signup.component'));
const register = lazy(() => import('./register/register.component'));
const recovery = lazy(() => import('./recovery/recovery.component'));
const resend = lazy(() => import('./resend/resend.component'));
const verify = lazy(() => import('./verify/verify.component'));
const setup = lazy(() => import('./setup/setup.component'));
const notfound = lazy(() => import('../notfound.component'));

export const AuthRoute: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Navigate to="login" />
    },
    {
      path: 'login',
      element: <Template name="login" component={login} />
    },
    {
      path: 'logout',
      element: <Template name="logout" component={logout} />
    },
    {
      path: 'signup',
      element: <Template name="signup" component={signup} />
    },
    {
      path: 'register',
      element: <Template name="register" component={register} />
    },
    {
      path: 'recovery',
      element: <Template name="recovery" component={recovery} />
    },
    {
      path: 'resend',
      element: <Template name="resend" component={resend} />
    },
    {
      path: 'verify/:token',
      element: <Template name="verify" component={verify} />
    },
    {
      path: 'setup',
      element: <Template name="setup" component={setup} />
    },
    {
      path: '*',
      element: <Template name="not-found" component={notfound} />
    },
  ]);

  return <>{routes}</>;
};