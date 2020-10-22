import React from 'react';
import { Link } from 'react-router-dom';

const HomeComponent: React.FC = (): JSX.Element => {
  return (
    <div>
      Home Router <Link to="/auth/logout">Logout</Link>
    </div>
  );
};

export default HomeComponent;
