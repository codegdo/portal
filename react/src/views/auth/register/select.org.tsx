import React from 'react';
import { Link } from 'react-router-dom';

export const SelectOrg: React.FC = (): JSX.Element => {

  return (
    <div>
      <h2>Select an organization to register</h2>
      <ul>
        <li><Link to="entrust">Entrust</Link></li>
        <li><Link to="jabra">Jabra</Link></li>
        <li><Link to="zyxel">Zyxel</Link></li>
        <li><Link to="philips">Philips</Link></li>
      </ul>
      Already registered? <Link to="/auth/login">Login</Link>
    </div>
  )
}