import React, { useState } from 'react';
import { Field } from '../field/field.component';
import { FormFieldProps } from './form.type';

export const FormField: React.FC<FormFieldProps> = ({ field }): JSX.Element | null => {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.value);
    setValue(e.target.value);
  }

  return (
    <Field data={field} value={value} onChange={handleChange}>
      <Field.Label />
      <Field.Input />
    </Field>
  )
};