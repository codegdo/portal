import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';

import Dashboard from './dashboard/dashboard.component';
import Deal from './deals/deal.component';
import NotFound from '../notfound.component';

const SaleProgram = (): JSX.Element => {
  const { programId } = useParams();
  const navigate = useNavigate();

  // get program

  useEffect(() => {
    //navigate('not-found');
  }, [])

  console.log(programId);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="dashboard" />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="deals" element={<Deal />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default SaleProgram;