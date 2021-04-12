import React, { } from 'react';
import { InputCheckbox } from './input.checkbox';
import { InputPassword } from './input.password';
import { InputRadio } from './input.radio';
import { InputSelect } from './input.select';
import { InputText } from './input.text';
import { InputTextarea } from './input.textarea';
import { InputContextValue, InputProps } from './input.type';

export const InputContext = React.createContext<InputContextValue | undefined>(undefined);

export const Input: React.FC<InputProps> = ({ data, value, onChange, onBlur, onFocus }): JSX.Element | null => {
  const { dataType } = data;

  return (
    <InputContext.Provider value={{ input: data, value, onChange, onBlur, onFocus }}>
      {
        (() => {
          switch (dataType) {
            case 'checkbox':
              return <InputCheckbox />;
            case 'radio':
              return <InputRadio />;
            case 'select':
              return <InputSelect />;
            case 'textarea':
              return <InputTextarea />;
            case 'password':
              return <InputPassword />
            default:
              return <InputText />
          }
        })()
      }
    </InputContext.Provider>
  )
}