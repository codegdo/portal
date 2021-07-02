import React, { useContext } from 'react';
import { DropdownContext } from './dropdown.component';

export const DropdownValue: React.FC = (): JSX.Element | null => {

  const context = useContext(DropdownContext);

  if (context == undefined) {
    return null;
  }

  const { value } = context;

  return <>{value}</>
}