import { FieldType } from '../components/types';
import { ArrayToObject, arrayToObject } from './array-to-object.util';

export function normalizeForm(fields: FieldType[]): { [x: string]: any } {
  const obj: ArrayToObject = {
    data: fields,
    id: 'name',
    key: 'value',
  };

  const form = arrayToObject(obj);

  return { form };
}
