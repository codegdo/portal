import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AppState } from '../../store/reducers';

export const NavProfile: React.FC = (): JSX.Element | null => {

  const { modules } = useSelector((state: AppState) => state.nav);

  return modules ? <ul>
    {
      modules.map(
        ({ name: moduleName, sortGroup, pages }): JSX.Element => {

          const pathModule = `/${moduleName.toLowerCase()}`;

          if (sortGroup === 1) {

            switch (moduleName) {
              case 'Help':
                return <NavLink key={pathModule} to={pathModule} >{moduleName}</NavLink>
              case 'Account':
                return <li>
                  <NavLink key={pathModule} to={pathModule} >{moduleName}</NavLink>
                  <ul>
                    {
                      pages.map(
                        ({ name: pageName }): JSX.Element => {
                          const pathPage = `/${pageName.toLowerCase()}`;
                          return <li>
                            <NavLink key={pathPage} to={`${pathModule}${pathPage}`}>{pageName}</NavLink>
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
                return <NavLink key={pathModule} to={pathModule} >{moduleName}</NavLink>
            }

          }
        }
      )
    }
  </ul> : null;
};