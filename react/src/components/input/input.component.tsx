import React, { } from 'react';
import { InputCheckbox } from './input.checkbox';
import { InputText } from './input.text';
import { InputContextValue, InputProps } from './input.type';

export const InputContext = React.createContext<InputContextValue | undefined>(undefined);

export const Input: React.FC<InputProps> = ({ data, value, onChange }): JSX.Element | null => {
  const { dataType } = data;

  return (
    <InputContext.Provider value={{ input: data, value, onChange }}>
      {
        (() => {
          switch (dataType) {
            case 'checkbox':
              return <InputCheckbox />;
            case 'radio':
              return null;
            case 'select':
              return null;
            case 'textarea':
              return null;
            default:
              return <InputText />
          }
        })()
      }
    </InputContext.Provider>
  )
}