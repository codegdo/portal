import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { AppState } from '../../store/reducers';

export const NavSub: React.FC = (): JSX.Element | null => {

  const { modules, ids } = useSelector((state: AppState) => state.nav);
  const { url } = useRouteMatch();
  const [subnav, setSubnav] = useState([]);

  useEffect(() => {

    if (modules) {
      const { pages } = modules[ids[url.substring(1).split('/')[0]]] || {};

      if (pages) {

        if (pages.length > 0) {
          pages.sort((a, b) => {
            return ((a.sortOrder < b.sortOrder) ? -1 : ((a.sortOrder > b.sortOrder) ? 1 : 0));
          });
        }

        setSubnav(pages);
      }
    }

  }, [url]);


  return subnav ? <>
    {
      subnav.map(
        ({ name }): JSX.Element => {
          return <NavLink key={name} to={`./${name.toLowerCase()}`}>{name}</NavLink>
        }
      )
    }
  </> : null;

};
