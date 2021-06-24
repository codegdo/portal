import React, { useContext } from 'react';
import { DropdownContext } from './dropdown.component';

export const DropdownToggle: React.FC<any> = ({ type, children }): JSX.Element | null => {

  const context = useContext(DropdownContext);

  if (context == undefined) {
    return null;
  }

  const { onClick } = context;

  switch (type) {
    case 'a':
      return (
        <a onClick={onClick} className="dropdown-button">
          {
            children ? children : <span>Dropdown Button</span>
          }
        </a>
      );
    default:
      return (
        <button onClick={onClick} type="button" className="dropdown-button">
          {
            children ? children : <span>Dropdown Button</span>
          }
        </button>
      );
  }


}
