import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import { AppState } from '../../store/reducers';

export const NavSub: React.FC<{ name: string }> = ({ name }): JSX.Element => {

  const { modules, ids } = useSelector((state: AppState) => state.nav);
  let match = window.location.pathname.split('/')[1];

  if (['coop', 'mdf'].includes(match)) {
    match = 'marketing';
  } else if (['dr', 'spa'].includes(match)) {
    match = 'sales';
  } else if (['rebate', 'spiff'].includes(match)) {
    match = 'rewards';
  }

  let subnav = [];

  if (ids && (ids[match] !== undefined)) {
    subnav = modules[ids[match]]?.pages;
  }

  return <>
    {
      subnav.map(
        ({ id, name, parentId }): JSX.Element => {

          return <Fragment key={id}>
            {
              !parentId && <NavLink to={name.toLowerCase()}>{name}</NavLink>
            }
          </Fragment>
        }
      )
    }
  </>;
};
