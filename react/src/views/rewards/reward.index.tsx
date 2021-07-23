import React from 'react';
import { Link } from 'react-router-dom';

const Reward = (): JSX.Element => {


  return (
    <div>
      REWARDS
      <ul>
        <li>
          <Link to="/123">Rebate</Link>
        </li>
        <li>
          <Link to="/124">Spiff</Link>
        </li>
      </ul>
    </div>
  );
};

export default Reward;
