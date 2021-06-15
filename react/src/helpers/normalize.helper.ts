import { ValidationSchema } from 'class-validator';
import { FormType } from '../components/types';
import { mapToParent } from '../utils';
import { FormObject, parseFormObject, parseFormValidationSchema } from '../helpers';

export const normalizeData = (form: any): FormType => {
  const { data = [], fields = [] } = JSON.parse(JSON.stringify(form));
  let list: any[] = [];

  [...data, ...fields].forEach((item) => {
    let { data, option } = item;

    if (typeof data === 'string') {
      item.data = JSON.parse(data);
    }

    if (typeof option === 'string') {
      item.option = JSON.parse(option);
    }

    return mapToParent(list, item);
  });

  return { ...form, data: list };
};

export function normalizeForm(form: FormType): {
  values: { [x: string]: string | number | boolean };
  errors: { [x: string]: string | number | boolean };
  formSchema: ValidationSchema;
} {
  const option: FormObject = {
    data: form,
    key: 'name',
    value: 'value',
    defaultValue: null,
  };

  const values = parseFormObject(option);
  const formSchema = parseFormValidationSchema(option);
  //const errors = parseFormError(validation);

  return { values, errors: {}, formSchema };
}
