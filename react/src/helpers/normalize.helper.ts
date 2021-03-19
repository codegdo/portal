import { ValidationSchema } from 'class-validator';
import { FormType } from '../components/types';
import { mapToParent } from '../utils';
import { FormObject, formObject, formSchema } from '../helpers';

export const normalizeData = (form: FormType): FormType => {
  const { data, fields } = JSON.parse(JSON.stringify(form));
  let list: any[] = [];

  [...data, ...fields].forEach((item) => mapToParent(list, item));

  return { ...form, data: list };
};

export function normalizeForm(
  form: FormType
): { values: any; errors: any; validation: ValidationSchema } {
  const obj: FormObject = {
    data: form,
    key: 'name',
    value: 'value',
    defaultValue: null,
  };

  const values = formObject(obj);
  const validation = formSchema(obj);

  return { values, errors: {}, validation };
}
