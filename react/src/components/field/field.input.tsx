import React, { useContext } from 'react';
import { FieldContext } from './field.component';

export const FieldInput: React.FC = () => {

  const context = useContext(FieldContext);

  if (context == undefined) {
    return null;
  }

  const { data: { text }, value, onChange } = context;

  return (
    <div>
      <input value={value == null ? '' : value} onChange={onChange} />
      {text && <small>{text}</small>}
    </div>
  )
}