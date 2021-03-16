import { FormType } from '../components/types';
import { toCamelCase } from './to-camel-case.util';

export interface FormToObject {
  data: FormType;
  key: string;
  value?: string;
  defaultValue?: any;
}

export function formToObject(obj: FormToObject): { [x: string]: string } {
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
