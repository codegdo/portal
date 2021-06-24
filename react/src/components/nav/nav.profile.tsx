import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { AppState } from '../../store/reducers';
import { Dropdown } from '../dropdown/dropdown.component';

export const NavProfile: React.FC = (): JSX.Element | null => {

  const { modules = [] } = useSelector((state: AppState) => state.nav);

  console.log('NAVPROFILE');

  return <>
    {
      modules.map((m): JSX.Element | null => {
        const { id, name, sortGroup, pages = [] } = m;
        const pathModule = `/${name.toLowerCase()}`;

        if (sortGroup === 2) {
          return <Dropdown key={id}>
            <Dropdown.Toggle type="button">
              DropDown
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {
                pages.map(({ id, name }): JSX.Element => {
                  const pathPage = `/${name.toLowerCase()}`;

                  return <li key={id}>
                    <NavLink to={`${pathModule}${pathPage}`}>{name}</NavLink>
                  </li>
                })
              }
            </Dropdown.Menu>
          </Dropdown>
        }

        return null;
      })
    }
  </>;
};