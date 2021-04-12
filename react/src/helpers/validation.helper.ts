import { FieldType } from '../components/types';

export const validateField = (field: FieldType, value: string): string => {
  let error = '';
  const { dataType, isRequired } = field;

  if (isRequired && !value) {
    error = 'Required';
  }

  switch (dataType) {
    case 'text':
      break;
    case 'email':
      break;
    case 'number':
      break;
    case 'date':
      break;
    case 'select':
      break;
    case 'radio':
      break;
    default:
  }

  return error;
};
