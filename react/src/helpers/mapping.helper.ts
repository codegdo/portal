import { FieldType } from '../components/types';
import { toCamelCase } from '../utils';

export const mapField = (data: FieldType[], values: { [key: string]: string }) => {
  return data.reduce((i: any, v: FieldType) => {
    const key = v.mapTo;
    const name = toCamelCase(v.name);

    const x = i[key];
    const z = { [name]: values[name + v.id] };

    i[key] = { ...x, ...z };

    return i;
  }, {});
};
