import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Dashboard from './dashboard/dashboard.page';
import Claim from './claims/claim.page';

const RewardProgram = (): JSX.Element => {

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="claims" element={<Claim />} />
    </Routes>
  );
};

export default RewardProgram;