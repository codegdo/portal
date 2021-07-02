import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

const RewardsComponent = (): JSX.Element => {
  const { url } = useRouteMatch();

  return (
    <div>
      REWARDS
      <ul>
        <li>
          <Link to={`${url}/123/dashboard`}>Rebate</Link>
        </li>
        <li>
          <Link to={`${url}/124/dashboard`}>Spiff</Link>
        </li>
      </ul>
    </div>
  );
};

export default RewardsComponent;
