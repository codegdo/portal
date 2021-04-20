import { validate } from 'class-validator';
import { useState } from 'react';
import { FieldType } from '../components/form';
import { toCamelCase } from '../utils';
import { parseFormError } from '../helpers';
import { TargetInput } from '../components/input/input.type';

export const useValidation = (
  initialValue: string,
  initialError: string
): [
  string,
  string,
  (field: FieldType, target: TargetInput) => Promise<void>,
  (field: FieldType) => void
] => {
  const initialState = { value: initialValue, error: initialError };
  const [state, setState] = useState(initialState);

  const setValue = async (field: FieldType, target: TargetInput): Promise<void> => {
    const keyId = toCamelCase(field.name + field.id);
    const value = target[keyId];

    const errors = await validate(keyId, { [keyId]: value });

    let errorMessage = '';

    if (errors.length > 0) {
      errorMessage = parseFormError(errors)[keyId];
    }

    // OPTIONS VALIDATION
    if ('validation' in target) {
      const { validation } = target;

      // password strength
      if ('strongPassword' in validation) {
        ///^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/
        if (!/^(?=.*[a-zA-Z0-9!@#$&*]).{6,}$/.test(value)) {
          errorMessage += 'Not match requirement. ';
        }
      }

      // password confirm
      if ('confirmPassword' in validation) {
        if (value != validation.confirmPassword) {
          errorMessage += 'Confirm password not match. ';
        }
      }
    }

    setState({ ...state, value, error: errorMessage });
  };

  const resetValue = (field: FieldType) => {
    setState({ value: field.value, error: '' });
  };

  return [state.value, state.error || initialError, setValue, resetValue];
};
