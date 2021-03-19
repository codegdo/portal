import { validate } from 'class-validator';
import { useState } from 'react';
import { FieldType } from '../components/form';
import { toCamelCase } from '../utils';
import { formError } from '../helpers';

export const useValidation = (
  defaultError: string
): [string | undefined, (field: FieldType, value: string) => void] => {
  const [error, setError] = useState<string | undefined>(defaultError);

  const setValidate = (field: FieldType, value: string): void => {
    const { id, name } = field;
    const schemaId = toCamelCase(name + id);
    const key = toCamelCase(name);

    //setError(validateField(field, value));

    validate(schemaId, { [key]: value }).then((errors) => {
      if (errors.length > 0) {
        const err = formError(errors);
        setError(err[key]);
      } else {
        setError('');
      }
    });
  };

  return [error, setValidate];
};
