import { FormObject, formObject } from '../helpers';

export function checkboxValue(
  str: string,
  option: FormObject
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

    const objKeys = formObject(option);

    obj = { ...objKeys, ...objValues };
  }

  return [arr, obj];
}
