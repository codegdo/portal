import React, { useContext } from 'react';
import { DropdownContext } from './dropdown.component';
import { DropdownItemProps } from './dropdown.type';

export const DropdownItem: React.FC<DropdownItemProps> = ({ type = 'li', className, children }): JSX.Element | null => {
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