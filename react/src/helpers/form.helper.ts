import { ValidationSchema } from 'class-validator';
import { FormType } from '../components/types';
import { toCamelCase } from '../utils';

type FormError = {
  [x: string]: any;
};

export interface FormObject {
  data: FormType;
  key: string;
  value?: string;
  defaultValue?: any;
}

export const formError = (errors: FormError[]) => {
  return errors.reduce((i, v) => {
    const { property, constraints } = v;
    const str = Object.keys(constraints)
      .map((k) => {
        return constraints[k];
      })
      .join('\n');

    i[property] = str;
    return i;
  }, {});
};

export function formObject(obj: FormObject): { [x: string]: string } {
  const {
    data: { fields },
    key,
    value,
    defaultValue,
  } = obj;

  return fields.reduce((i, v) => {
    const keyId = toCamelCase(v[key] + (v.id || ''));

    value !== undefined
      ? (i[keyId] = v[value] || '')
      : (i[keyId] = defaultValue ? defaultValue : v);

    return i;
  }, {});
}

export function formSchema(obj: FormObject): ValidationSchema {
  const {
    data: { fields, name, id },
    key,
  } = obj;

  const validations = fields.reduce((i, v) => {
    const { dataType, isRequired, minLength, maxLength } = v;
    const keyId = toCamelCase(v[key]);
    const array: any[] = [];

    switch (dataType) {
      case 'email':
        array.push({
          type: 'isEmail',
        });
        break;
      case 'number':
        break;
      case 'date':
        array.push({
          type: 'isDate',
        });
        break;
      case 'password':
        array.push({
          type: 'matches',
          constraints: [/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/],
          message: 'Not match requirement.',
        });
        break;
      default:
    }

    isRequired &&
      array.push({
        type: 'isNotEmpty',
        message: 'Field is required.',
      });

    minLength &&
      array.push({
        type: 'minLength',
        constraints: [minLength],
        message: `Min length is ${minLength}`,
      });

    maxLength &&
      array.push({
        type: 'maxLength',
        constraints: [maxLength],
        message: `Max length is ${maxLength}`,
      });

    return (i = { ...i, [keyId]: [...array] });
  }, {});

  return {
    name: name + id,
    properties: { ...validations },
  };
}
