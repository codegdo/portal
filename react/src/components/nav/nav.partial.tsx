import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducers';

import { NavComponent } from './nav.component';

export const NavMain: React.FC<any> = (): JSX.Element => {
  const data = {
    type: 'main',
  };

  const loggedIn = useSelector((state: AppState) => state.session.loggedIn);

  console.log(loggedIn);

  return <NavComponent data={data} />;
};
