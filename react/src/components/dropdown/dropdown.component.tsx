import React, { useRef, useState } from 'react';
import { useToggle } from '../../hooks';
import { DropdownToggle } from './dropdown.toggle';
import { DropdownMenu } from './dropdown.menu';
import { DropdownItem } from './dropdown.item';
import { DropdownValue } from './dropdown.value';
import { DropdownContextValue, DropdownProps } from './dropdown.type';
import { DropdownIcon } from './dropdown.icon';

interface DropdownExtends {
  Toggle: typeof DropdownToggle;
  Value: typeof DropdownValue;
  Menu: typeof DropdownMenu;
  Item: typeof DropdownItem;
  Icon: typeof DropdownIcon;
}

export const DropdownContext = React.createContext<DropdownContextValue | undefined>(undefined);

export const Dropdown: React.FC<DropdownProps> & DropdownExtends = ({ value: defaultValue, placeholder = '', className = 'dropdown', onChange, children }): JSX.Element => {
  const ddRef = useRef(null);
  const [isToggle, setIsToggle] = useToggle(ddRef, false);
  const [value, setValue] = useState(defaultValue);

  const onToggle = () => setIsToggle(!isToggle);

  const dropdownChange = (e: React.ChangeEvent<HTMLElement>) => {
    console.log(e.target);
    setValue('');
    onChange && onChange(e);
  }

  return (
    <div className={`${className} ${isToggle ? 'expanded' : ''}`}>
      <DropdownContext.Provider value={{ ddRef, value, placeholder, isToggle, onToggle, dropdownChange }}>
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
Dropdown.Icon = DropdownIcon;
