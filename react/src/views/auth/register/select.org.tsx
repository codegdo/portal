import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

export const SelectOrg: React.FC = (): JSX.Element => {

  const match = useRouteMatch();

  return (
    <div>
      <h2>Select an organization to register</h2>
      <ul>
        <li><Link to={`${match.url}/entrust`}>Entrust</Link></li>
        <li><Link to={`${match.url}/jabra`}>Jabra</Link></li>
        <li><Link to={`${match.url}/zyxel`}>Zyxel</Link></li>
        <li><Link to={`${match.url}/philips`}>Philips</Link></li>
      </ul>
      Already registered? <Link to="/auth/login">Login</Link>
    </div>
  )
}