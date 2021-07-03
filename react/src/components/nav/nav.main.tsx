import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AppState } from '../../store/reducers';
import { NavMainProps } from './nav.type';

export const NavMain: React.FC<NavMainProps> = ({ url = '', className = 'link' }): JSX.Element => {

  const { modules = [] } = useSelector((state: AppState) => state.nav);
  const matchUrl = '/' + url.split('/')[1];

  return <>
    {
      modules.map(
        ({ id, name, sortGroup }): JSX.Element | null => {

          const path = `/${name.toLowerCase()}`;

          if (sortGroup === 11) {
            switch (name) {
              case 'Marketing':
                return <li key={id}><NavLink to={path} className={className} isActive={() => [path, '/coops', '/mdfs'].includes(matchUrl)}>{name}</NavLink></li>
              case 'Sales':
                return <li key={id}><NavLink to={path} className={className} isActive={() => [path, '/vars', '/spas'].includes(matchUrl)}>{name}</NavLink></li>
              case 'Rewards':
                return <li key={id}><NavLink to={path} className={className} isActive={() => [path, '/rebates', '/spiffs'].includes(matchUrl)}>{name}</NavLink></li>
              default:
                return <li key={id}><NavLink to={path} className={className}>{name}</NavLink></li>
            }
          }

          return null;
        }
      )
    }
  </>;

};
