import React from 'react';
import { Link } from 'react-router-dom';

type SignupSuccessProps = {
  data: {
    username: string;
  }
}

const SignupSuccess: React.FC<SignupSuccessProps> = ({ data }): JSX.Element => {
  return (
    <div>
      <strong>Almost there...</strong>
      <small>Please check your email to confirm your account</small>
      <p>No confirmation email received? Please check your spam folder or</p>
      <Link to={{ pathname: "/auth/resend", state: { ...data } }}>Request new confirmation</Link>
    </div>
  );
};

export default SignupSuccess;
