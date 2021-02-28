import { FormType, FieldType } from '../components/types';
import { arrayToObject, ArrayToObject, mapToParent } from '../utils';

export const normalizeData = (form: FormType): FormType => {
  const { data, fields } = JSON.parse(JSON.stringify(form));
  let list: any[] = [];

  [...data, ...fields].forEach((item) => mapToParent(list, item));

  return { ...form, data: list };
};

export function normalizeForm(
  fields: FieldType[]
): { values: any; errors: any; ok: boolean } {
  const obj: ArrayToObject = {
    data: fields,
    key: 'name',
    value: 'value',
    defaultValue: null,
  };

  const values = arrayToObject(obj);

  return { values, errors: {}, ok: true };
}
