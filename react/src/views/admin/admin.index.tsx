import React, { lazy } from 'react';
import { Outlet, Route, Routes, } from 'react-router-dom';

import { Partial } from '../../components/template/template.partial';

const ProgramIndex = Partial(lazy(() => import('./programs/program.index')));
const Program = Partial(lazy(() => import('./programs/program.page')));
const UserIndex = Partial(lazy(() => import('./users/user.index')));
const User = Partial(lazy(() => import('./users/user.page')));
const NotFound = Partial(lazy(() => import('../notfound.component')));

const Admin: React.FC = (): JSX.Element => {
  return <Routes>
    <Route path="programs*" element={<Outlet />}>
      <Route path="/" element={<ProgramIndex page="programs" />} />
      <Route path=":moduleName" element={<Program page="programs" />} />
      <Route path=":moduleName/new" element={<Program page="programs" />} />
      <Route path=":moduleName/:programId" element={<Program page="programs" />} />
    </Route>

    <Route path="users*" element={<Outlet />}>
      <Route path="/" element={<UserIndex page="users" />} />
      <Route path=":userType" element={<User page="users" />} />
      <Route path=":userType/new" element={<User page="users" />} />
      <Route path=":userType/:userId" element={<User page="users" />} />
    </Route>
    <Route path="*" element={<NotFound page="not-found" />} />
  </Routes>;
};

export default Admin;