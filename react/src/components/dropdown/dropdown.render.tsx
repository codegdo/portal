import React, { useContext } from 'react';
import { DropdownContext } from './dropdown.component';
import { DropdownItem } from './dropdown.item';

export const DropdownRender: React.FC = (): JSX.Element | null => {
  const context = useContext(DropdownContext);

  if (context == undefined) {
    return null;
  }

  const { list = [] } = context;

  return list.length ? <>
    {
      list.map((item): JSX.Element | null => {
        return <DropdownItem />;
      })
    }
  </> : <DropdownItem />;
};