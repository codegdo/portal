import React, { useContext } from 'react';
import { DropdownContext } from './dropdown.component';

export const DropdownItem: React.FC<any> = ({ type = 'li', className = 'dropdown-item', children }): JSX.Element | null => {
  const context = useContext(DropdownContext);

  if (context == undefined) {
    return null;
  }

  const { onToggle } = context;

  return React.createElement(
    `${type}`,
    { onClick: onToggle, className },
    children ? children : <>option</>
  );
};