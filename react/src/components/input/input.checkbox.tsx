import React, { useContext, useEffect, useState } from 'react';
import { stringToArrayObject } from '../../utils/string-to-array-object.util';
import { InputContext } from './input.component';

export const InputCheckbox: React.FC = () => {
  const context = useContext(InputContext);

  if (context == undefined) {
    return null;
  }
  // value = 'one;two::one:asf;two:abc'
  const { input: { data }, value, onChange } = context;
  const [aChecks, oInputs] = stringToArrayObject(value, { data, key: 'value', value: '' });
  // ['one','two']
  const [checks, setChecks] = useState(aChecks);
  // {one:item, two:item2}
  const [inputs, setInputs] = useState(oInputs);

  useEffect(() => {
    const checkVal = checks.join(';');
    const inputVal = Object.entries(inputs)
      .filter(v => (checks.includes(v[0]) && includedInput(v[0])))
      .map(v => v[0] + ":" + v[1])
      .join(';');

    let updatedVal = checkVal;

    if (checks.length > 0 && inputVal) {
      updatedVal = updatedVal + '::' + inputVal;
    }

    onChange && onChange(updatedVal);
  }, [checks, inputs]);

  const includedInput = (v: string): boolean => {
    return data.filter((item: any) => (item.value == v && item.input !== '')).length !== 0;
  }

  const checkboxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value: val } = e.target;
    const checkVals = checks.includes(val) ? checks.filter((v: string) => v !== val) : [...checks, val];

    setChecks([...checkVals]);

    if (checks.includes(val)) {
      setInputs({ ...inputs, [val]: '' });
    }
  }

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value: val, name } = e.target;
    setInputs({ ...inputs, [name]: val });
  }

  return (
    <>
      {
        data.map((item: any, i: number) => {
          const val = inputs[item.value];

          return (
            <label key={i}>
              <span><input type="checkbox" value={item.value} checked={checks.includes(item.value)} onChange={checkboxChange} /></span>
              {item.text && <span>{item.text}</span>}
              {item.input && <span><input type={item.input} name={item.value} disabled={!checks.includes(item.value)} value={val} onChange={inputChange} /></span>}
            </label>
          )
        })
      }
    </>
  )
}