import React, { useContext } from 'react';
import { InputContext } from './input.component';

export const InputText: React.FC = () => {
  const context = useContext(InputContext);

  if (context == undefined) {
    return null;
  }

  const { input: { dataType }, value, onChange } = context;

  return (
    <input type={dataType} value={value == null ? '' : value} onChange={(e) => onChange && onChange(e.target.value)} />
  )
}