import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useRouteMatch } from 'react-router-dom';
import { AppState } from '../../store/reducers';

import { NavComponent } from './nav.component';

export const NavSub: React.FC = (): JSX.Element | null => {

  const { modules, ids } = useSelector((state: AppState) => state.nav);
  const { url } = useRouteMatch();
  const [subnav, setSubnav] = useState([]);

  console.log(url);
  // strip of slash
  // split /

  useEffect(() => {

    if (modules) {
      setSubnav(modules[ids['sales']].pages);
    }

    return () => {
      //
    }
  }, [url]);

  console.log(subnav);

  return subnav ? <NavComponent data={subnav} /> : null;
};
