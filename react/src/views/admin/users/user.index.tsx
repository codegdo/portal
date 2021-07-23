import React from 'react';
import { NavLink } from 'react-router-dom';

const UserIndex = (): JSX.Element => {

  return (
    <div className="content">
      <header>
        <h2>Users</h2>
      </header>
      <nav>
        <ul className="tabbar">
          <li><NavLink to="external">External</NavLink></li>
          <li><NavLink to="internal">Internal</NavLink></li>
        </ul>
      </nav>
    </div>
  );
};

export default UserIndex;