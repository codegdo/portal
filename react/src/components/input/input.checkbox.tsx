import React, { useContext, useEffect, useState } from 'react';
import { parseCheckboxValue } from '../../helpers';
import { InputContext } from './input.component';

export const InputCheckbox: React.FC = () => {
  const context = useContext(InputContext);

  if (context == undefined) {
    return null;
  }

  // value = 'one;two::one:asf;two:abc'
  const { input: { data }, value: initialValue, onChange } = context;

  const [aChecks, oInputs] = parseCheckboxValue(initialValue, { data, key: 'value', value: '' });

  // ['one','two']
  const [checks, setChecks] = useState(aChecks);
  // {one:item, two:item2}
  const [inputs, setInputs] = useState(oInputs);
  //
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    let checkVal = checks.join(';');

    const inputVal = Object.entries(inputs)
      .filter(v => (checks.includes(v[0]) && includedInput(v[0])))
      .map(v => v[0] + ":" + v[1])
      .join(';');

    if (checks.length > 0 && inputVal) {
      checkVal = checkVal + '::' + inputVal;
    }

    changed && (onChange && onChange(checkVal));

    return () => {
      setChanged(false);
    }
  }, [checks, inputs]);

  const includedInput = (v: string): boolean => {
    return data.filter((item: any) => (item.value == v && item.input !== '' && item.input !== undefined)).length !== 0;
  }

  const checkboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    const checkVals = checks.includes(value) ? checks.filter((v: string) => v !== value) : [...checks, value];

    setChecks([...checkVals]);
    checks.includes(value) && setInputs({ ...inputs, [value]: '' });
    setChanged(true);
  }

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
    setChanged(true);
  }

  return (
    <>
      {
        data.map(({ value, text, input }: any, i: number) => {
          const checked = checks.includes(value);
          return (
            <label key={i}>
              <span><input type="checkbox" value={value} checked={checked} onChange={checkboxChange} /></span>
              {text && <span>{text}</span>}
              {input && <span><input type={input} name={value} value={inputs[value]} disabled={!checked} onChange={inputChange} /></span>}
            </label>
          )
        })
      }
    </>
  )
}