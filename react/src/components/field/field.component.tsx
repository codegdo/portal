import React, { useRef } from 'react';

import { FieldLabel } from './field.label';
import { FieldInput } from './field.input';
import { FieldContextValue, FieldProps } from './field.type';

interface FieldExtends {
  Label: typeof FieldLabel;
  Input: typeof FieldInput;
}

export const FieldContext = React.createContext<FieldContextValue | undefined>(undefined);

export const Field: React.FC<FieldProps> & FieldExtends = ({ data, value, error, onChange, children }) => {

  const divRef = useRef<HTMLDivElement>(null);

  const onBlur = () => {
    if (divRef.current) {
      if (value) {
        divRef.current.setAttribute('data-focus', 'true');
      } else {
        divRef.current.setAttribute('data-focus', 'false');
      }
    }
  }

  const onFocus = () => {
    if (divRef.current) {
      divRef.current.setAttribute('data-focus', 'true');
    }
  }

  return (
    <div className={error ? 'field -error' : 'field'} ref={divRef}>
      <FieldContext.Provider value={{ data, value, error, onChange, onFocus, onBlur }}>
        {
          children
        }
      </FieldContext.Provider>
    </div>
  )
}

Field.Label = FieldLabel;
Field.Input = FieldInput;