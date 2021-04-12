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
    <div className="field-label">
      <span className="label">
        <label>{label}</label>
        {description && <em className="description"><small>{description}</small></em>}
      </span>
    </div>
  )
}