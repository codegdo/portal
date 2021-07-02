import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

const Marketing = (): JSX.Element => {
  const { url } = useRouteMatch();

  return (
    <div>
      MARKETING
      <ul>
        <li>
          <Link to={`${url}/123/dashboard`}>Coop</Link>
        </li>
        <li>
          <Link to={`${url}/124/dashboard`}>Mdf</Link>
        </li>
      </ul>
    </div>
  );
};

export default Marketing;
