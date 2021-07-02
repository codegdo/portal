import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

const SalesComponent = (): JSX.Element => {

  const { url } = useRouteMatch();

  return (
    <div>
      SALES
      <ul>
        <li>
          <Link to={`${url}/123/dashboard`}>Deal Registration</Link>
        </li>
        <li>
          <Link to={`${url}/124/dashboard`}>Special Pricing Request</Link>
        </li>
      </ul>
    </div>
  );
};

export default SalesComponent;
