import React from 'react';
import { Link } from 'react-router-dom';
type VerfifySuccessProps = {
  data: any
}
const VerifySuccess: React.FC<VerfifySuccessProps> = ({ data }): JSX.Element => {
  return (
    <div>
      <Link to="/auth/login">Login</Link>
    </div>
  );
}

export default VerifySuccess;