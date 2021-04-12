import React, { useContext, useLayoutEffect, useRef } from 'react';
import { toCamelCase } from '../../utils';
import { FieldType } from '../form';
import { InputContext } from './input.component';

export const InputText: React.FC = () => {
  const context = useContext(InputContext);

  const { input = {}, value = '', onChange, onBlur, onFocus } = context || {};
  const { name = '', id, dataType = 'text', text = '', options }: Partial<FieldType> = input;
  const keyId = toCamelCase(name + id);
  const { setting } = options;

  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (setting && setting.isFocus && inputRef.current) {
      if (document.activeElement !== inputRef.current) {
        inputRef.current.focus();
      }
    };
  });

  const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = {
      [keyId]: event.target.value
    };
    onChange && onChange(target);
  }

  return (
    <span className={"input-" + dataType}>
      <input type={dataType} ref={inputRef} value={value == null ? '' : value} onChange={(event) => changeInput(event)} onBlur={onBlur} onFocus={onFocus} />
      {text && <em className="description"><small>{text}</small></em>}
    </span>
  )
}