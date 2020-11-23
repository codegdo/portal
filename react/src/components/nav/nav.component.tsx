import React from 'react';

export interface NavComponentData {
  type: string;
}
export interface NavComponentProps {
  data: NavComponentData;
}

export const NavComponent: React.FC<NavComponentProps> = ({ data }): JSX.Element => {
  console.log(data);
  return <div>NAV</div>;
};

// nav
// subnav
// sidenav
//
