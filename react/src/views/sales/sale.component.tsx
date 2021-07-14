import React from 'react';
import { Link } from 'react-router-dom';

const Sale: React.FC = (): JSX.Element => {

  // get programs

  return (
    <div>
      SALES
      <ul>
        <li>
          <Link to="123">Deal Registration</Link>
        </li>
        <li>
          <Link to="124">Special Pricing Request</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sale;
