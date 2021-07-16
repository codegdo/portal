import React, { lazy } from 'react';
import { Navigate, Route, Routes, } from 'react-router-dom';

import { Partial } from '../../components/partial/partial.component';

const Login = Partial(lazy(() => import('./login/login.component')));
const Logout = Partial(lazy(() => import('./logout/logout.component')));
const Signup = Partial(lazy(() => import('./signup/signup.component')));
const Register = Partial(lazy(() => import('./register/register.component')));
const Recovery = Partial(lazy(() => import('./recovery/recovery.component')));
const Resend = Partial(lazy(() => import('./resend/resend.component')));
const Verify = Partial(lazy(() => import('./verify/verify.component')));
const Setup = Partial(lazy(() => import('./setup/setup.component')));
const NotFound = Partial(lazy(() => import('../notfound.component')));

const Auth: React.FC = (): JSX.Element => {
  return <Routes>
    <Route path="/" element={<Navigate to="login" />} />
    <Route path="login" element={<Login name="login" />} />
    <Route path="logout" element={<Logout name="logout" />} />
    <Route path="signup" element={<Signup name="signup" />} />
    <Route path="register*" element={<Register name="register" />} />
    <Route path="recovery" element={<Recovery name="recovery" />} />
    <Route path="resend" element={<Resend name="resend" />} />
    <Route path="verify" element={<Verify name="verify" />} />
    <Route path="setup" element={<Setup name="setup" />} />
    <Route path="*" element={<NotFound name="not-found" />} />
  </Routes>;
};

export default Auth;