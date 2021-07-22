import React, { lazy, useEffect, useState } from 'react';
import { Navigate, Outlet, Route, Routes, useParams } from 'react-router-dom';

import { Partial } from '../../components/partial/partial.component';
import { useFetch } from '../../hooks';

const Dashboard = Partial(lazy(() => import('./dashboard/dashboard.component')));
const Registrations = Partial(lazy(() => import('./registrations/registration.component')));
const Registration = Partial(lazy(() => import('./registrations/registration.edit')));
const NotFound = Partial(lazy(() => import('../notfound.component')));

const Program: React.FC = (props): JSX.Element => {
  const { programId } = useParams();

  const { fetching, result, fetchData } = useFetch<any>(
    `/api/sales/programs/${programId}`
  );

  const [program, setProgram] = useState(null);

  useEffect(() => {
    if (fetching == 'success' && result) {
      setProgram(result.data);
    }
  }, [fetching])

  useEffect(() => {
    void fetchData();
  }, []);

  return result ? (
    result.ok ? <div>
      <h2>{program?.name}</h2>
      <Routes>
        <Route path="/" element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard {...props} page="dashboard" program={program} />} />
        <Route path="registrations*" element={<Outlet />}>
          <Route path="/" element={<Registrations {...props} page="registrations" program={program} />} />
          <Route path="/new" element={<Registration {...props} page="registration" program={program} />} />
          <Route path=":regId" element={<Registration {...props} page="registration" program={program} />} />
        </Route>
        <Route path="*" element={<NotFound {...props} page="not-found" />} />
      </Routes>
    </div> : <NotFound {...props} page="not-found" />
  ) : <div>loading...</div>;
};

export default Program;