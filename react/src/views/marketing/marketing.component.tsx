import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

const Marketing = (): JSX.Element => {
  const { url } = useRouteMatch();

  return (
    <div>
      MARKETING
      <ul>
        <li>
          <Link to={`${url}/123`}>Coop</Link>
        </li>
        <li>
          <Link to={`${url}/124`}>Mdf</Link>
        </li>
      </ul>
    </div>
  );
};

export default Marketing;
