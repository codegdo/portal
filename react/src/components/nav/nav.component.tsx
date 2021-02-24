import React from 'react';
import { NavComponentProps } from './nav.type';

export const NavComponent: React.FC<NavComponentProps> = ({ data }): JSX.Element => {
  console.log(data);
  return <div>NAV</div>;
};

// nav
// subnav
// sidenav
//
