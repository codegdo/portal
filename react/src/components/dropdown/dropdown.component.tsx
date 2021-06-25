import React, { useRef, useState } from 'react';
import { useToggle } from '../../hooks';
import { DropdownToggle } from './dropdown.toggle';
import { DropdownMenu } from './dropdown.menu';
import { DropdownItem } from './dropdown.item';
import { DropdownValue } from './dropdown.value';

interface DropdownExtends {
  Toggle: typeof DropdownToggle;
  Value: typeof DropdownValue;
  Menu: typeof DropdownMenu;
  Item: typeof DropdownItem;
}

export const DropdownContext = React.createContext<any>(undefined);

export const Dropdown: React.FC<any> & DropdownExtends = ({ type = 'dropdown', value: defaultValue, placeholder, className = 'dropdown', onChange, children }): JSX.Element => {
  const ddRef = useRef(null);
  const [isToggle, setIsToggle] = useToggle(ddRef, false);
  const [value, setValue] = useState(defaultValue);

  const onToggle = () => setIsToggle(!isToggle);

  const dropdownChange = (e) => {
    console.log(e.target);
    onChange && onchange();
  }

  return (
    <div className={`${className} ${isToggle ? 'expanded' : ''}`}>
      <DropdownContext.Provider value={{ ddRef, value, isToggle, onToggle, dropdownChange }}>
        {
          children ? children : <><DropdownToggle /><DropdownMenu /></>
        }
      </DropdownContext.Provider>
    </div>
  );
}

// extend props
Dropdown.Toggle = DropdownToggle;
Dropdown.Value = DropdownValue;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;
