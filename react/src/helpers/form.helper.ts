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

export const parseFormError = (errors: FormError[]) => {
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

export function parseFormObject(option: FormObject): { [x: string]: string } {
  const {
    data: { fields },
    key,
    value,
    defaultValue,
  } = option;

  return fields.reduce((i, v) => {
    const keyId = toCamelCase(v[key] + (v.id || ''));

    value !== undefined
      ? (i[keyId] = v[value] || '')
      : (i[keyId] = defaultValue ? defaultValue : v);

    return i;
  }, {});
}

export function parseFormValidationSchema(option: FormObject): ValidationSchema {
  const {
    data: { fields, name, id },
    key,
  } = option;

  const validations = fields.reduce((i, v) => {
    const { dataType, isRequired, minLength, maxLength } = v;
    //const { setting, validation } = (typeof options === 'string' && JSON.parse(options)) || options;
    const keyId = toCamelCase(v[key] + (v.id || ''));
    const array: any[] = [];

    // DB
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

    // OPTIONAL
    /* if (validation) {
      const { strongPassword } = validation;

      strongPassword &&
        array.push({
          type: 'matches',
          constraints: [/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/],
          message: 'Not match requirement.',
        });
    }

    if (setting) {
      const { showConfirmPassword } = setting;

      showConfirmPassword &&
        array.push({
          type: 'customValidation',
          constraints: [
            (object: any, value: any) => {
              console.log(object);
              console.log(value);
              //return object['color'] !== null && object['color'] !== undefined && object['color'] === 'green'  && object['color'] === 'red';
            },
          ],
          validate: (value: any) => {
            console.log(value);
          },
          message: 'Not match requirement.',
        });
    } */

    // STANDARD
    switch (dataType) {
      case 'email':
        array.push({
          type: 'isEmail',
          constraints: [/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/],
          message: 'Invalid email.',
        });
        break;
      case 'number':
        break;
      case 'date':
        array.push({
          type: 'isDate',
        });
        break;
      default:
    }

    return (i = { ...i, [keyId]: [...array] });
  }, {});

  return {
    name: name + id,
    properties: { ...validations },
  };
}
