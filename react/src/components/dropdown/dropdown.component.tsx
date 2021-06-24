import React, { useRef } from 'react';
import { useOutClick } from '../../hooks';
import { DropdownToggle } from './dropdown.toggle';
import { DropdownMenu } from './dropdown.menu';

interface DropdownExtends {
  Toggle: typeof DropdownToggle;
  Menu: typeof DropdownMenu;
}

export const DropdownContext = React.createContext<any>(undefined);

export const Dropdown: React.FC<any> & DropdownExtends = ({ children }): JSX.Element => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useOutClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);

  return (
    <div className="dropdown">
      <DropdownContext.Provider value={{ onClick, dropdownRef, isActive }}>
        {
          children ? children : <span>Dropdown</span>
        }
      </DropdownContext.Provider>
    </div >
  );
}

// extend props
Dropdown.Toggle = DropdownToggle;
Dropdown.Menu = DropdownMenu;
