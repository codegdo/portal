import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';

import Internal from './internal.component';
import External from './internal.component';

const User = (): JSX.Element => {

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
      <main>
        <Routes>
          <Route path="internal" element={<Internal />} />
          <Route path="external" element={<External />} />
        </Routes>
      </main>
    </div>
  );
};

export default User;
