import React, { useContext, useEffect, useState } from 'react';
import { FormContext } from '.';
import { useValidation } from '../../hooks/validation.hook';
import { toCamelCase } from '../../utils';
import { Field } from '../field/field.component';
import { FormFieldProps } from './form.type';

export const FormField: React.FC<FormFieldProps> = ({ field }): JSX.Element | null => {
  const context = useContext(FormContext);

  if (context == undefined) {
    return null;
  }

  const { id, name } = field;
  const key = toCamelCase(name + id);
  let { form, submitting } = context;
  const [value, setValue] = useState(form.values[key]);
  const [error, setValidate] = useValidation();

  useEffect(() => {
    if (submitting) {
      (error == undefined) && setValidate(field, value);

      if (error != '') {
        form.errors[key] = error;
      }

      form.values[key] = value;
    }

  }, [submitting]);

  const handleChange = (value: string): void => {
    setValidate(field, value);
    setValue(value);
  }

  return (
    <Field data={field} error={error} value={value} onChange={handleChange}>
      <Field.Label />
      <Field.Input />
    </Field>
  )
};