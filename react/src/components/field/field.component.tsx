import React from 'react';

import { FieldLabel } from './field.label';
import { FieldInput } from './field.input';
import { FieldContextValue, FieldProps } from './field.type';

interface FieldExtends {
  Label: typeof FieldLabel;
  Input: typeof FieldInput;
}

export const FieldContext = React.createContext<FieldContextValue | undefined>(undefined);

export const Field: React.FC<FieldProps> & FieldExtends = ({ data, value, onChange, children }) => {
  return (
    <div>
      <FieldContext.Provider value={{ data, value, onChange }}>
        {
          children
        }
      </FieldContext.Provider>
    </div>
  )
}

Field.Label = FieldLabel;
Field.Input = FieldInput;