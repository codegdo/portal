import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AppState } from '../../store/reducers';
import { NavComponentProps } from './nav.type';

export const NavComponent: React.FC<NavComponentProps> = ({ group }): JSX.Element | null => {
  const { modules = [] } = useSelector((state: AppState) => state.nav);

  return <>
    {
      modules.map((item): JSX.Element | null => {

        const { id, name, sortGroup, pages = [] } = item;
        const pathmodule = name.toLowerCase();

        if (sortGroup === group) {
          return <Fragment key={id}>
            {
              pages.map(({ id, name, parentId }): JSX.Element => {
                const pathpage = name.toLowerCase();

                return <Fragment key={id}>
                  {
                    !(parentId) && <li><NavLink to={`/${pathmodule}/${pathpage}`}>{name}</NavLink></li>
                  }
                </Fragment>
              })
            }
          </Fragment>
        }

        return null;
      })
    }
  </>;
};