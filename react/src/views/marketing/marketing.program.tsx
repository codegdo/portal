import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Dashboard from './dashboard/dashboard.page';
import Request from './requests/request.page';
import Claim from './claims/claim.page';
import Payment from './payments/payment.page';

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