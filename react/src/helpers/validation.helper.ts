import { FieldType, FormType } from '../components/types';
import { splitKeyId } from '../utils/split-key-id.util';

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

export const validateForm = (form: any, data: FormType): boolean => {
  let error = false;
  for (let key in form.errors) {
    if (form.errors[key] == undefined || form.errors[key] !== '') {
      const { id } = splitKeyId(key);
      const field = data.fields.find((item) => {
        return item.id == id;
      });

      // validation
      const validation = validateField(field, form.values[key]);

      if (validation !== '') {
        error = true;
      }
    } else {
      error = true;
    }
  }
  return error;
};
