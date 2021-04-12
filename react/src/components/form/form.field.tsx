import { registerSchema } from 'class-validator';
import React, { useContext, useEffect } from 'react';
import { FormContext } from '.';
import { useValidation } from '../../hooks/validation.hook';
import { toCamelCase } from '../../utils';
import { Field } from '../field/field.component';
import { TargetInput } from '../input/input.type';
import { FormFieldProps } from './form.type';

export const FormField: React.FC<FormFieldProps> = ({ field }): JSX.Element | null => {
  const context = useContext(FormContext);

  if (context == undefined) {
    return null;
  }

  let { values, errors, response, status, formValidationSchema } = context;

  const keyId = toCamelCase(field.name + field.id);
  const [value, error, setValue, resetValue] = useValidation(values[keyId], errors[keyId]);

  const fieldValidationSchema = {
    name: keyId,
    properties: {
      [keyId]: [...formValidationSchema.properties[keyId]]
    }
  };

  useEffect(() => {
    registerSchema(fieldValidationSchema);
  }, []);

  useEffect(() => {
    values[keyId] = value;
  }, [value]);

  useEffect(() => {
    if (status === 'submit') {
      (error == undefined) && setValue(field, { [keyId]: value });

      if (error && error != '') {
        errors[keyId] = error;
      }
    } else if (status === 'reset') {
      resetValue(field);
    }

  }, [status]);

  useEffect(() => {
    if (response && response.clear) {
      resetValue(field);
    }
  }, [response]);

  const handleChange = (target: TargetInput): void => {
    setValue(field, target);
  }

  return (
    <Field data={field} error={error} value={value} onChange={handleChange}>
      <Field.Label />
      <Field.Input />
    </Field>
  )
};