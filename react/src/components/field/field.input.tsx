import React, { useContext } from 'react';
import { Input } from '../input/input.component';
import { FieldContext } from './field.component';

export const FieldInput: React.FC = () => {

  const context = useContext(FieldContext);

  if (context == undefined) {
    return null;
  }

  const { data, value, error, onChange, onBlur, onFocus } = context;

  return (
    <div className="input">
      <Input data={data} value={value} onChange={onChange} onBlur={onBlur} onFocus={onFocus} />
      {error && <span className="input-message">{error}</span>}
    </div>
  )
}