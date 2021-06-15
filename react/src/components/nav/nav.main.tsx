import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducers';

import { NavComponent } from './nav.component';

export const NavMain: React.FC = (): JSX.Element => {

  const { modules } = useSelector((state: AppState) => state.nav);

  return <NavComponent data={modules} />;
};
