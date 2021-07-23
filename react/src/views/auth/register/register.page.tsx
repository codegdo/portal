import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { SelectOrg } from './select.org';
import { SelectForm } from './select.form';
import { RegisterForm } from './register.form';

const Register: React.FC = (): JSX.Element => {
  return <Routes>
    <Route path="/" element={<SelectOrg />} />
    <Route path=":org" element={<SelectForm />} />
    <Route path=":org/:form" element={<RegisterForm />} />
  </Routes>
}

export default Register;