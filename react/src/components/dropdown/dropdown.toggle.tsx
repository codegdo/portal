import React, { useContext } from 'react';
import { DropdownContext } from './dropdown.component';
import { DropdownToggleProps } from './dropdown.type';
import { DropdownValue } from './dropdown.value';

export const DropdownToggle: React.FC<DropdownToggleProps> = ({ type = 'button', className = 'dropdown-toggle', children }): JSX.Element | null => {

  const context = useContext(DropdownContext);

  if (context == undefined) {
    return null;
  }

  const { onToggle } = context;

  return React.createElement(
    `${type}`,
    { onClick: onToggle, className },
    children ? children : <DropdownValue />
  );
}
