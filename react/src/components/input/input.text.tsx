import React, { useContext, useLayoutEffect, useRef } from 'react';
import { InputContext, TargetInput } from './';
import { FieldType } from '../form';
import { toCamelCase } from '../../utils';

export const InputText: React.FC = () => {
  const context = useContext(InputContext);

  const { input, value, onChange, onBlur, onFocus } = context || {};

  const { name, id, dataType, text, option }: Partial<FieldType> = input || {};

  const nameId = toCamelCase(`${name || ''}${id || ''}`);

  // option
  let isFocus = false;

  if (typeof option === 'object') {
    const { setting } = option;

    // setting
    isFocus = setting?.isFocus || false;
  }

  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (isFocus) {
      // document.activeElement
      if (inputRef.current) {
        inputRef.current.value === '' && inputRef.current.focus();
      }
    }
  });

  const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target: TargetInput = {
      [nameId]: event.target.value
    };
    onChange && onChange(target);
  }

  return (
    <>
      <span className={`input-${dataType || ''}`}>
        <input
          type={dataType}
          ref={inputRef}
          value={value}
          onChange={changeInput}
          onBlur={onBlur}
          onFocus={onFocus}
        />

      </span>
      {
        text &&
        <span className="input-description">
          <small>{text}</small>
        </span>
      }
    </>
  )
}