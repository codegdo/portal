import React from 'react';
import { Dropdown } from '../dropdown/dropdown.component';
import { NavComponent } from './nav.component';

import { NavMain } from './nav.main';
import { NavMenuProps } from './nav.type';

export const NavMenu: React.FC<NavMenuProps> = (props): JSX.Element | null => {

  console.log('NAVMENU');

  return <li>
    {
      <Dropdown className="dropdown">
        <Dropdown.Toggle type="a" className="link-icon">
          <Dropdown.Icon icon="menu" toggleIcon="close" />
        </Dropdown.Toggle>
        <Dropdown.Menu type="div" className="dropdown-menu -full">
          <small>Module</small>
          <ul className="nav-menu">
            <NavMain {...props} />
          </ul>
          <small>Admin</small>
          <ul className="nav-menu">
            <NavComponent group={1} />
          </ul>
        </Dropdown.Menu>
      </Dropdown>
    }
  </li>;
};