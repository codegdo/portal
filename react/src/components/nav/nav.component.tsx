import React from 'react';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { NavComponentProps } from './nav.type';

export const NavComponent: React.FC<NavComponentProps> = ({ data }): JSX.Element | null => {

  const match = useRouteMatch();
  const location = useLocation();

  console.log('MATCH', match);
  console.log('location', location);

  return data ? <>
    {
      data.map(
        (item): JSX.Element => {
          return <Link key={item.name} to={`${item.name.toLowerCase()}`}>{item.name}</Link>
        }
      )
    }
  </> : null;
};

// mainnav
// subnav -- will update when module switch
// sidenav
//
