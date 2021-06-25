import React, { useContext } from 'react';
import { DropdownContext } from './dropdown.component';
import { DropdownRender } from './dropdown.render';

export const DropdownMenu: React.FC<any> = ({ type = 'ul', children }): JSX.Element | null => {
  const context = useContext(DropdownContext);

  if (context == undefined) {
    return null;
  }

  const { ddRef, isToggle } = context;

  return React.createElement(
    `${type}`,
    {
      className: 'dropdown-menu',
      ref: ddRef,
      'aria-expanded': isToggle
    },
    children ? children : <DropdownRender />
  );

};