import { toCamelCase } from '../utils';

export interface InputObject {
  data: { [x: string]: any };
  key: string;
  value?: string;
  defaultValue?: any;
}

export function parseInputObject(option: InputObject): { [x: string]: string } {
  const {
    data: { fields },
    key,
    value,
    defaultValue,
  } = option;

  return fields.reduce((i: any, v: any) => {
    const keyId = toCamelCase(v[key] + (v.id || ''));

    value !== undefined
      ? (i[keyId] = v[value] || '')
      : (i[keyId] = defaultValue ? defaultValue : v);

    return i;
  }, {});
}

export function parseCheckboxValue(
  str: string,
  option: InputObject
): [string[], { [key: string]: string }] {
  const x = str.split('::');

  let arr: string[] = x[0].split(';').map(function (item: string) {
    return item.trim();
  });

  if (arr[0] === '' && arr.length === 1) {
    arr = [];
  }

  let obj = {};

  if (x[1]) {
    const objValues = x[1].split(';').reduce((result: any, token: string) => {
      var [key, val] = token.split(':');

      result[key] = val;
      return result;
    }, {});

    const objKeys = parseInputObject(option);

    obj = { ...objKeys, ...objValues };
  }

  return [arr, obj];
}
