import React, { useContext } from 'react';
import { Input } from '../input/input.component';
import { FieldContext } from './field.component';

export const FieldInput: React.FC = () => {

  const context = useContext(FieldContext);

  if (context == undefined) {
    return null;
  }

  const { data, value, error, onChange } = context;
  const { text } = data;

  return (
    <div>
      <Input data={data} value={value} onChange={onChange} />
      {text && <small>{text}</small>}
      {error && <strong>{error}</strong>}
    </div>
  )
}