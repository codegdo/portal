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

          return sortGroup == 2 && <NavLink key={name} to={path} isActive={() => [path].includes(pathname)} >{name}</NavLink>
        }
      )
    }
  </> : null;

  //return <NavComponent data={modules} />;
};
