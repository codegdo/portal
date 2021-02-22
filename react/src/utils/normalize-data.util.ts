import { FormType } from '../components/form';
import { mapToParent } from './map-to-parent.util';

export const normalizeData = (form: FormType): FormType => {
  const { data, fields } = JSON.parse(JSON.stringify(form));
  let list: any[] = [];

  [...data, ...fields].forEach((item) => mapToParent(list, item));

  return { ...form, data: list };
};
