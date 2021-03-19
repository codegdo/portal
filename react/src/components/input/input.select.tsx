import React, { useContext } from 'react';
import { InputContext } from './input.component';

export const InputSelect: React.FC = () => {
  const context = useContext(InputContext);

  if (context == undefined) {
    return null;
  }
  // value = 'one'
  const { input: { data, text }, value, onChange } = context;

  return (
    <>
      <select defaultValue={value} onChange={(e) => onChange && onChange(e.target.value)}>
        {
          data.map(({ value: val, text: txt }: any, i: number) => {
            return <option key={i} value={val}>{txt}</option>
          })
        }
      </select>
      {text && <span>{text}</span>}
    </>
  )
}