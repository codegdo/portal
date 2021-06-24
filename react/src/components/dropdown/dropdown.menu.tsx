import React, { useContext } from 'react';
import { DropdownContext } from './dropdown.component';

export const DropdownMenu: React.FC<any> = ({ children }): JSX.Element | null => {
  const context = useContext(DropdownContext);

  if (context == undefined) {
    return null;
  }

  const { dropdownRef, isActive } = context;

  return (
    <div ref={dropdownRef} className={`dropdown-menu`} aria-expanded={isActive} >
      {
        children ? children : <span>DropDown Menu</span>
      }
    </div>
  )
};