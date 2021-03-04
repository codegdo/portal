import React, { useContext } from 'react';
import { InputContext } from './input.component';

export const InputText: React.FC = () => {
  const context = useContext(InputContext);

  if (context == undefined) {
    return null;
  }

  const { value, onChange } = context;

  return (
    <input value={value == null ? '' : value} onChange={(e) => onChange && onChange(e.target.value)} />
  )
}