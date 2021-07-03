import React, { useContext } from 'react';
import { DropdownContext } from './dropdown.component';
import { DropdownIconProps } from './dropdown.type';

export const DropdownIcon: React.FC<DropdownIconProps> = ({ className = 'icon', icon, toggleIcon }): JSX.Element | null => {

  const context = useContext(DropdownContext);

  if (context == undefined) {
    return null;
  }

  const { isToggle } = context;

  return <i className={className}>{isToggle ? toggleIcon : icon}</i>
}