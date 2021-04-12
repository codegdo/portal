import { ValidationSchema } from 'class-validator';
import { FormType } from '../components/types';
import { mapToParent } from '../utils';
import { FormObject, parseFormObject, parseFormValidationSchema } from '../helpers';

export const normalizeData = (form: any): FormType => {
  const { data = [], fields = [] } = JSON.parse(JSON.stringify(form));
  let list: any[] = [];

  [...data, ...fields].forEach((item) => {
    let { data, options } = item;

    if (typeof data === 'string') {
      item.data = JSON.parse(data);
    }

    if (typeof options === 'string') {
      item.options = JSON.parse(options);
    }

    return mapToParent(list, item);
  });

  return { ...form, data: list };
};

export function normalizeForm(
  form: FormType
): { values: any; errors: any; formValidationSchema: ValidationSchema } {
  const option: FormObject = {
    data: form,
    key: 'name',
    value: 'value',
    defaultValue: null,
  };

  const values = parseFormObject(option);
  const formValidationSchema = parseFormValidationSchema(option);
  //const errors = parseFormError(validation);

  return { values, errors: {}, formValidationSchema };
}
