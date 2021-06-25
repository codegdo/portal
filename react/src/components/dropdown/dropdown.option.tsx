import React, { useContext } from 'react';
import { DropdownContext } from './dropdown.component';

export const DropdownOption: React.FC<any> = ({ type = 'li', className = 'dropdown-option', children }): JSX.Element | null => {
  const context = useContext(DropdownContext);

  if (context == undefined) {
    return null;
  }

  const { onToggle, dropdownChange } = context;

  const onClick = (e) => {
    dropdownChange(e);
    onToggle();
  }

  return React.createElement(
    `${type}`,
    { onClick, className },
    children ? children : <span>Option</span>
  );
};