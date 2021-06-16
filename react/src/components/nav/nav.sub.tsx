import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { AppState } from '../../store/reducers';

export const NavSub: React.FC = (): JSX.Element | null => {

  const { modules, ids } = useSelector((state: AppState) => state.nav);
  const { url } = useRouteMatch();
  const [subnav, setSubnav] = useState([]);

  useEffect(() => {
    let pathname = url.substring(1).split('/')[0];

    if (['coops', 'mdfs'].includes(pathname)) {
      pathname = 'marketing';
    } else if (['vars', 'spas'].includes(pathname)) {
      pathname = 'sales';
    } else if (['rebates', 'spiffs'].includes(pathname)) {
      pathname = 'rewards';
    }

    if (modules) {
      const { pages } = modules[ids[pathname]] || {};

      if (pages) {
        setSubnav(pages);
      }
    }

  }, [url]);


  return <>
    {
      subnav.map(
        ({ name }): JSX.Element => {
          return <NavLink key={name} to={`./${name.toLowerCase()}`}>{name}</NavLink>
        }
      )
    }
  </>;

};
