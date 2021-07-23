import React, { lazy } from 'react';
import { Navigate, Route, Routes, } from 'react-router-dom';

import { Partial } from '../../components/template/template.partial';

const Login = Partial(lazy(() => import('./login/login.page')));
const Logout = Partial(lazy(() => import('./logout/logout.page')));
const Signup = Partial(lazy(() => import('./signup/signup.page')));
const Register = Partial(lazy(() => import('./register/register.page')));
const Recovery = Partial(lazy(() => import('./recovery/recovery.page')));
const Resend = Partial(lazy(() => import('./resend/resend.page')));
const Verify = Partial(lazy(() => import('./verify/verify.page')));
const Trial = Partial(lazy(() => import('./trial/trial.page')));
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
    <Route path="trial" element={<Trial page="trial" />} />
    <Route path="*" element={<NotFound page="not-found" />} />
  </Routes>;
};

export default Auth;