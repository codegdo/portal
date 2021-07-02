import React from 'react';
import { useMediaQuery } from '../../hooks';
import { NavMenu } from './nav.menu';
import { NavProfile } from './nav.profile';


export const NavMenuProfile: React.FC = (): JSX.Element | null => {
  const isWidth640 = useMediaQuery('(min-width: 640px)');

  return <>
    {
      isWidth640 ? <NavProfile /> : <NavMenu />
    }
  </>;
};