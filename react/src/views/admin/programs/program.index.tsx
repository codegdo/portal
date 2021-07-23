import React from 'react';
import { NavLink } from 'react-router-dom';

const ProgramIndex = (): JSX.Element => {

  return (
    <div className="content">
      <header>
        <h2>Programs</h2>
      </header>
      <nav>
        <ul className="tabbar">
          <li><NavLink to="marketing">Marketing</NavLink></li>
          <li><NavLink to="sales">Sales</NavLink></li>
          <li><NavLink to="rewards">Rewards</NavLink></li>
        </ul>
      </nav>
    </div>
  );
};

export default ProgramIndex;
