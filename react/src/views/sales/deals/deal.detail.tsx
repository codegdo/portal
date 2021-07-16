import React from 'react';
import { useParams } from 'react-router';
import { useLocation } from 'react-router';

const DealDetail: React.FC = (): JSX.Element => {

  const location = useLocation();
  const params = useParams();

  console.log(location);
  console.log(params);

  return <div>DEAL FORM</div>;
};

export default DealDetail;
