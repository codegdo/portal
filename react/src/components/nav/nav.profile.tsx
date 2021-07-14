import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from '../dropdown/dropdown.component';
import { Avatar } from '../item';

import { NavComponent } from './nav.component';

export const NavProfile: React.FC<{ name: string }> = (props): JSX.Element | null => {

  console.log('NAVPROFILE');

  return <>
    <li>
      <Dropdown>
        <Dropdown.Toggle type="a" className="link-icon">
          <i className="icon">settings</i>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu -right">
          <NavComponent group={1} {...props} />
        </Dropdown.Menu>
      </Dropdown>
    </li>
    <li>
      <Dropdown>
        <Dropdown.Toggle type="a" className="link-icon">
          <Avatar />
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu -right">
          <NavComponent group={2} {...props} />
          <Dropdown.Item>
            <Link to="/auth/logout" className="dropdown-link">Logout</Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </li>
  </>;
};