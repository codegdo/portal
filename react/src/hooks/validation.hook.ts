import { useState } from 'react';
import { FieldType } from '../components/form';
import { validateField } from '../helpers';
export const useValidation = (): [
  string | undefined,
  (field: FieldType, value: string) => void
] => {
  const [error, setError] = useState<string | undefined>();

  const setValidate = (field: FieldType, value: string): void => {
    setError(validateField(field, value));
  };

  return [error, setValidate];
};
