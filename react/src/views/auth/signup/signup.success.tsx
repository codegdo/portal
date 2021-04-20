import React from 'react';
import { Link } from 'react-router-dom';

type SignupSuccessProps = {
  data: {
    username: string;
  }
}

const SignupSuccess: React.FC<SignupSuccessProps> = ({ data }): JSX.Element => {
  console.log(data);
  const { username } = data;
  return (
    <div>
      <strong>Almost there...</strong>
      <small>Please check your email to confirm your account</small>
      <p>No confirmation email received? Please check your spam folder or</p>
      <Link to={`/auth/resend?username=${username}`}>Request new confirmation</Link>
    </div>
  );
};

export default SignupSuccess;
