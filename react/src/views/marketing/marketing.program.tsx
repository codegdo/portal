import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Dashboard from './dashboard/dashboard.component';
import Request from './requests/request.component';
import Claim from './claims/claim.component';
import Payment from './payments/payment.component';

const MarketingProgram = (): JSX.Element => {

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="requests" element={<Request />} />
      <Route path="claims" element={<Claim />} />
      <Route path="payments" element={<Payment />} />
    </Routes>
  );
};

export default MarketingProgram;