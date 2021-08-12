import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { AppState } from '../../store/reducers';
import { NavMainProps } from './nav.type';

export const NavMain: React.FC<NavMainProps> = ({ className = 'link' }): JSX.Element => {
  const { data = [] } = useSelector((state: AppState) => state.nav);
  const path = window.location.pathname.split('/')[1];

  return <>
    {
      data.map(
        ({ id, name, sortGroup }): JSX.Element | null => {

          const pathname = `/${name.toLowerCase()}`;

          if (sortGroup === 11) {
            return <li key={id}>
              {
                ((): JSX.Element | null => {
                  switch (name) {
                    case 'Marketing':
                      return <Link to={pathname} className={`${['marketing', 'coop', 'mdf'].includes(path) ? className + ' active' : className}`}>{name}</Link>;
                    case 'Sales':
                      return <Link to={pathname} className={`${['sales', 'var', 'spa'].includes(path) ? className + ' active' : className}`}>{name}</Link>
                    case 'Rewards':
                      return <Link to={pathname} className={`${['rewards', 'rebate', 'spiff'].includes(path) ? className + ' active' : className}`}>{name}</Link>
                    default:
                      return <NavLink to={pathname}>{name}</NavLink>
                  }
                })()
              }
            </li>
          }
          return null;
        }
      )
    }
  </>;

};
