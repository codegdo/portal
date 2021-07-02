import React, { useContext } from 'react';
import { DropdownContext } from './dropdown.component';
import { DropdownOptionProps } from './dropdown.type';

export const DropdownOption: React.FC<DropdownOptionProps> = ({ type = 'li', className, children }): JSX.Element | null => {
  const context = useContext(DropdownContext);

  if (context == undefined) {
    return null;
  }

  const { onToggle, dropdownChange } = context;

  const onClick = (e: React.ChangeEvent<HTMLElement>) => {
    dropdownChange(e);
    onToggle();
  }

  return React.createElement(
    `${type}`,
    { onClick, className },
    children ? children : <span>Option</span>
  );
};