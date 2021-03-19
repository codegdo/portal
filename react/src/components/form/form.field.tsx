import { registerSchema } from 'class-validator';
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

  let { values, errors, validation, submit } = context;
  const { id, name } = field;
  const keyId = toCamelCase(name + id);
  const key = toCamelCase(name);
  const [value, setValue] = useState(values[keyId]);

  const fieldValidationSchema = {
    name: keyId,
    properties: {
      [key]: [...validation.properties[key]]
    }
  }
  const [error, setValidate] = useValidation(errors[key]);

  useEffect(() => {
    registerSchema(fieldValidationSchema);
  }, []);

  useEffect(() => {
    if (submit) {
      (error == undefined) && setValidate(field, value);

      if (error && error != '') {
        errors[keyId] = error;
      }

      values[keyId] = value;
    }

  }, [submit]);

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