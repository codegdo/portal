
import React, { lazy, useEffect, useState } from 'react';
import { Navigate, Outlet, Route, Routes, useParams } from 'react-router-dom';
//import { TemplateContext } from '../../components/template/template.component';

import { Partial } from '../../components/template/template.partial';
import { useFetch } from '../../hooks';
import { SaleProgramData } from './sale.type';

const Dashboard = Partial(lazy(() => import('./dashboard/dashboard.page')));
const Registrations = Partial(lazy(() => import('./registrations/registration.page')));
const Registration = Partial(lazy(() => import('./registrations/registration.edit')));
const NotFound = Partial(lazy(() => import('../notfound.component')));

const Program: React.FC = (props): JSX.Element => {
  const { programId } = useParams();

  //const context = useContext(TemplateContext);

  const { fetching, result, fetchData } = useFetch<SaleProgramData>(
    `/api/sales/programs/${programId}`
  );

  const [program, setProgram] = useState<SaleProgramData | undefined>();

  useEffect(() => {
    if (fetching == 'success' && result) {
      setProgram(result.data);
      //context?.setProgram(result.data.name);
    }
  }, [fetching])

  useEffect(() => {
    void fetchData();
  }, []);

  return result ? (
    result.ok ? <div>
      <Routes>
        <Route path="/" element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard {...props} program={program} page="dashboard" />} />
        <Route path="registrations*" element={<Outlet />}>
          <Route path="/" element={<Registrations {...props} program={program} page="registrations" />} />
          <Route path="/new" element={<Registration {...props} program={program} page="registration" />} />
          <Route path=":regId" element={<Registration {...props} program={program} page="registration" />} />
        </Route>
        <Route path="*" element={<NotFound {...props} page="not-found" />} />
      </Routes>
    </div> : <NotFound {...props} page="not-found" />
  ) : <div>loading...</div>;
};

export default Program;