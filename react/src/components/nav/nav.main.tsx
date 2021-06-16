import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { AppState } from '../../store/reducers';

export const NavMain: React.FC = (): JSX.Element | null => {

  const { modules } = useSelector((state: AppState) => state.nav);
  const { pathname } = useLocation();

  return modules ? <>
    {
      modules.map(
        ({ name, sortGroup }): JSX.Element => {

          const path = `/${name.toLowerCase()}`;

          if (sortGroup === 2) {
            switch (name) {
              case 'Marketing':
                return <NavLink key={pathname} to={path} isActive={() => [path, '/coops', '/mdfs'].includes(pathname)} >{name}</NavLink>
              case 'Sales':
                return <NavLink key={pathname} to={path} isActive={() => [path, '/vars', '/spas'].includes(pathname)} >{name}</NavLink>
              case 'Rewards':
                return <NavLink key={pathname} to={path} isActive={() => [path, '/rebates', '/spiffs'].includes(pathname)} >{name}</NavLink>
              default:
                return <NavLink key={pathname} to={path} >{name}</NavLink>
            }
          }
        }
      )
    }
  </> : null;
};
