import React, { useContext } from 'react';
import { InputContext } from './input.component';

export const InputRadio: React.FC = () => {
  const context = useContext(InputContext);

  if (context == undefined) {
    return null;
  }
  // value = 'one'
  const { input: { data, name }, value, onChange } = context;

  return (
    <>
      {
        data.map(({ value: val, text }: any, i: number) => {
          return (
            <label key={i}>
              <span><input type="radio" name={name} value={val} checked={val === value} onChange={(e) => onChange && onChange(e.target.value)} /></span>
              {text && <span>{text}</span>}
            </label>
          )
        })
      }
    </>
  )
}