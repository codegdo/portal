import React, { lazy } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { Partial } from '../../components/partial/partial.component';

const Dashboard = Partial(lazy(() => import('./dashboard/dashboard.component')));
const Registrations = Partial(lazy(() => import('./registrations/registration.component')));
const Registration = Partial(lazy(() => import('./registrations/registration.edit')));
const NotFound = Partial(lazy(() => import('../notfound.component')));

const Program: React.FC = (props): JSX.Element => {

  return <Routes>
    <Route path="/" element={<Navigate to="dashboard" />} />
    <Route path="dashboard" element={<Dashboard {...props} name="dashboard" />} />
    <Route path="registrations*" element={<Outlet />}>
      <Route path="/" element={<Registrations {...props} name="registrations" />} />
      <Route path=":regId" element={<Registration {...props} name="registration" />} />
    </Route>
    <Route path="*" element={<NotFound {...props} name="not-found" />} />
  </Routes>;
};

export default Program;