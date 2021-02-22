import React, { useContext } from 'react';
import { FieldContext } from './field.component';

export const FieldLabel: React.FC = () => {
  const context = useContext(FieldContext);

  if (context == undefined) {
    return null;
  }

  const { data } = context;
  const { label, description } = data;

  return (
    <span>
      <label>{label}</label>
      {description && <em>{description}</em>}
    </span>
  )
}