import React, { lazy, useEffect, useState } from 'react';
import { Navigate, Outlet, Route, Routes, useNavigate, useParams } from 'react-router-dom';

import { Partial } from '../../components/partial/partial.component';

const Dashboard = Partial(lazy(() => import('./dashboard/dashboard.component')));
const Deals = Partial(lazy(() => import('./deals/deal.component')));
const Deal = Partial(lazy(() => import('./deals/deal.detail')));
const NotFound = Partial(lazy(() => import('../notfound.component')));

const SaleProgram: React.FC<any> = ({ programs }): JSX.Element => {
  const { programId } = useParams();
  const navigate = useNavigate();
  const [found, setFound] = useState(true);

  // check valid programs
  useEffect(() => {

    if (programId !== undefined) {
      if (programs.filter(p => p.id === programId).length === 0) {
        navigate('not-found');
        setFound(false);
      }
    }

  }, [programId]);

  return found ? <Routes>
    <Route path="/" element={<Navigate to="dashboard" />} />
    <Route path="dashboard" element={<Dashboard name="dashboard" />} />
    <Route path="deals*" element={<Outlet />}>
      <Route path="/" element={<Deals name="deals" />} />
      <Route path=":formId" element={<Deal name="deal" />} />
    </Route>
    <Route path="*" element={<NotFound name="not-found" />} />
  </Routes> : <NotFound name="not-found" />;
};

export default SaleProgram;