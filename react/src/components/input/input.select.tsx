import React, { useContext } from 'react';
import { InputContext, TargetInput } from './';
import { FieldType, NormalizeElement } from '../form';
import { toCamelCase } from '../../utils';

export const InputSelect: React.FC = () => {
  const context = useContext(InputContext);

  const { input, value, onChange } = context || {};

  const { name, id, text, data = [] }: Partial<FieldType> = input || {};

  const nameId = toCamelCase(`${name || ''}${id || ''}`);

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const target: TargetInput = {
      [nameId]: event.target.value
    };
    onChange && onChange(target);
  }

  return (
    <span className="input-select">
      <select defaultValue={value} onChange={selectChange}>
        {
          data.map(({ value: val, text: txt }: NormalizeElement, i: number) => {
            return <option key={i} value={val}>{txt}</option>
          })
        }
      </select>
      {
        text &&
        <em className="description">
          <small>{text}</small>
        </em>
      }
    </span>
  )
}