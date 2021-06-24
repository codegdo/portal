import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AppState } from '../../store/reducers';

export const NavMain: React.FC<any> = ({ url }): JSX.Element => {

  const { modules = [] } = useSelector((state: AppState) => state.nav);

  console.log('NAVMAIN', url);

  return <>
    {
      modules.map(
        ({ id, name, sortGroup }): JSX.Element | null => {

          const path = `/${name.toLowerCase()}`;

          if (sortGroup === 11) {
            switch (name) {
              case 'Marketing':
                return <NavLink key={id} to={path} isActive={() => [path, '/coops', '/mdfs'].includes(url)}>{name}</NavLink>
              case 'Sales':
                return <NavLink key={id} to={path} isActive={() => [path, '/vars', '/spas'].includes(url)}>{name}</NavLink>
              case 'Rewards':
                return <NavLink key={id} to={path} isActive={() => [path, '/rebates', '/spiffs'].includes(url)}>{name}</NavLink>
              default:
                return <NavLink key={id} to={path}>{name}</NavLink>
            }
          }

          return null;
        }
      )
    }
  </>;

};
