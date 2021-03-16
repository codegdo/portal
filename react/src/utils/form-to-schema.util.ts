import { ValidationSchema } from 'class-validator';
import { FormToObject } from './form-to-object.util';
import { toCamelCase } from './to-camel-case.util';

export function formToSchema(obj: FormToObject): ValidationSchema {
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
