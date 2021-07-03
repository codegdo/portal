import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AppState } from '../../store/reducers';
import { NavComponentProps } from './nav.type';

export const NavComponent: React.FC<NavComponentProps> = ({ group }): JSX.Element | null => {

  const { modules = [] } = useSelector((state: AppState) => state.nav);

  console.log('NAVCOMPONENT');

  return <>
    {
      modules.map((m): JSX.Element | null => {

        const { id, name, sortGroup, pages = [] } = m;
        const pathModule = `/${name.toLowerCase()}`;

        if (sortGroup === group) {
          return <Fragment key={id}>
            {
              pages.map(({ id, name, parentId }): JSX.Element => {
                const pathPage = `/${name.toLowerCase()}`;

                return !parentId && <li key={id}><NavLink to={`${pathModule}${pathPage}`} className="dropdown-link">{name}</NavLink></li>
              })
            }
          </Fragment>
        }

        return null;
      })
    }
  </>;
};