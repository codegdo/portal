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
    <Route path="login" element={<Login page="login" />} />
    <Route path="logout" element={<Logout page="logout" />} />
    <Route path="signup" element={<Signup page="signup" />} />
    <Route path="register*" element={<Register page="register" />} />
    <Route path="recovery" element={<Recovery page="recovery" />} />
    <Route path="resend" element={<Resend page="resend" />} />
    <Route path="verify/:tokenId" element={<Verify page="verify" />} />
    <Route path="setup" element={<Setup page="setup" />} />
    <Route path="*" element={<NotFound page="not-found" />} />
  </Routes>;
};

export default Auth;