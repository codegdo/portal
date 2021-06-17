import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AppState } from '../../store/reducers';

export const NavSub: React.FC<any> = ({ url }): JSX.Element => {

  const { modules, ids } = useSelector((state: AppState) => state.nav);

  let path = '.';
  let pathname = url.substring(1).split('/')[0];

  if (['coops', 'mdfs'].includes(pathname)) {
    pathname = 'marketing';
  } else if (['vars', 'spas'].includes(pathname)) {
    pathname = 'sales';
  } else if (['rebates', 'spiffs'].includes(pathname)) {
    pathname = 'rewards';
  } else if (pathname == '') {
    pathname = 'admin';
    path = './admin';
  }

  let pages = [];

  if (ids && ids[pathname]) {
    pages = modules[ids[pathname]]?.pages
  }

  console.log('NAVSUB', url);

  return <>
    {
      pages.map(
        ({ id, name }): JSX.Element => {
          return <NavLink key={id} to={`${path}/${name.toLowerCase()}`}>{name}</NavLink>
        }
      )
    }
  </>;
};
