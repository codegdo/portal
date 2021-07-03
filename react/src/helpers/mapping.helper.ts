import { FieldType } from '../components/types';
import { toCamelCase, stringTemplateReplace, sortArray } from '../utils';

type Layouts = {
  external: { [x: string]: string };
  internal: { [x: string]: string };
  general: { [x: string]: string };
};

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

export const mapTemplate = (templates: [] = []): Layouts => {
  return templates.reduce(
    (i, v) => {
      const { type, name, html = '' } = v;

      const layout = { ...i[type], [name]: stringTemplateReplace(html) };

      return (i = { ...i, [type]: { ...layout } });
    },
    { internal: {}, external: {}, general: {} }
  );
};

export const mapNav = (modules: [] = []): { modules: []; ids: {} } => {
  const ids = modules.reduce((acc, item, index) => {
    const key: string = item.name.toLowerCase();

    const { pages = [] } = modules[index];

    if (pages && pages.length > 0) {
      sortArray(pages, 'sortOrder');
    }

    return { ...acc, [key]: index };
  }, {});

  return { modules, ids };
};
