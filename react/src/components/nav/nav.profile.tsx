import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { AppState } from '../../store/reducers';

export const NavProfile: React.FC = (): JSX.Element | null => {

  const { modules = [] } = useSelector((state: AppState) => state.nav);

  console.log('NAVPROFILE');

  return <ul>
    {
      modules.map(
        ({ id, name, sortGroup, pages = [] }): JSX.Element | null => {

          const pathModule = `/${name.toLowerCase()}`;

          if (sortGroup === 1) {

            switch (name) {
              case 'Help':
                return <NavLink key={id} to={pathModule}>{name}</NavLink>
              case 'Account':
                return <li key={id}>
                  <NavLink to={pathModule}>{name}</NavLink>
                  <ul>
                    {
                      pages.map(
                        ({ id, name }): JSX.Element => {
                          const pathPage = `/${name.toLowerCase()}`;

                          return <li key={id}>
                            <NavLink to={`${pathModule}${pathPage}`}>{name}</NavLink>
                          </li>
                        }
                      )
                    }
                    <li>
                      <Link to="/auth/logout">Logout</Link>
                    </li>
                  </ul>
                </li>
              default:
                return <NavLink key={id} to={pathModule} >{name}</NavLink>
            }

          }

          return null;
        }
      )
    }
  </ul>;
};