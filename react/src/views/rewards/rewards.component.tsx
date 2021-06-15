import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

const RewardsComponent = (): JSX.Element => {
  const { url } = useRouteMatch();

  return (
    <div>
      REWARDS
      <ul>
        <li>
          <Link to={`${url}/123`}>Rebate</Link>
        </li>
        <li>
          <Link to={`${url}/124`}>Spiff</Link>
        </li>
      </ul>
    </div>
  );
};

export default RewardsComponent;
