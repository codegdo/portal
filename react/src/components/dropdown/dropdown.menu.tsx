import React, { useContext } from 'react';
import { DropdownContext } from './dropdown.component';
import { DropdownRender } from './dropdown.render';
import { DropdownMenuProps } from './dropdown.type';

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ type = 'ul', className = 'dropdown-menu', children }): JSX.Element | null => {
  const context = useContext(DropdownContext);

  if (context == undefined) {
    return null;
  }

  const { ddRef, isToggle } = context;

  return React.createElement(
    `${type}`,
    {
      className,
      ref: ddRef,
      'aria-expanded': isToggle
    },
    children ? children : <DropdownRender />
  );

};