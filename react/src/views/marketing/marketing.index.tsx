import React from 'react';
import { Link } from 'react-router-dom';

const Marketing = (): JSX.Element => {

  return (
    <div>
      MARKETING
      <ul>
        <li>
          <Link to="/123">Coop</Link>
        </li>
        <li>
          <Link to="/124">Mdf</Link>
        </li>
      </ul>
    </div>
  );
};

export default Marketing;
