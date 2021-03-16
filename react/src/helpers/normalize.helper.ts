import { ValidationSchema } from 'class-validator';
import { FormType } from '../components/types';
import { FormToObject, formToObject, formToSchema, mapToParent } from '../utils';

export const normalizeData = (form: FormType): FormType => {
  const { data, fields } = JSON.parse(JSON.stringify(form));
  let list: any[] = [];

  [...data, ...fields].forEach((item) => mapToParent(list, item));

  return { ...form, data: list };
};

export function normalizeForm(
  form: FormType
): { values: any; errors: any; validation: ValidationSchema } {
  const obj: FormToObject = {
    data: form,
    key: 'name',
    value: 'value',
    defaultValue: null,
  };

  const values = formToObject(obj);
  const validation = formToSchema(obj);

  return { values, errors: {}, validation };
}
