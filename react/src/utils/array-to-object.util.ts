import { toCamelCase } from './to-camel-case.util';

export interface ArrayToObject {
  data: any[];
  key: string;
  value?: string;
  defaultValue?: any;
}

export function arrayToObject(
  obj: ArrayToObject
): { [x: string]: string | number | boolean } {
  const { data, key, value, defaultValue } = obj;

  return data.reduce((i, v) => {
    const keyId = toCamelCase(v[key] + v.id);

    value !== undefined
      ? (i[keyId] = v[value] || '')
      : (i[keyId] = defaultValue ? defaultValue : v);

    return i;
  }, {});
}
