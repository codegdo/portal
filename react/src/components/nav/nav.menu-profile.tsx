import React from 'react';
import { useMediaQuery } from '../../hooks';
import { NavMenu } from './nav.menu';
import { NavProfile } from './nav.profile';


export const NavMenuProfile: React.FC<{ name: string }> = (props): JSX.Element | null => {
  const isWidth640 = useMediaQuery('(min-width: 640px)');

  console.log('NAV MENU PROFILE', isWidth640);

  return <>
    {
      isWidth640 ? <NavProfile {...props} /> : <NavMenu  {...props} />
    }
  </>;
};