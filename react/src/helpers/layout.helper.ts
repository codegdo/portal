import { stringTemplateReplace } from '../utils';

type Layouts = {
  external: { [x: string]: string };
  internal: { [x: string]: string };
  general: { [x: string]: string };
};

export const mapTemplateToLayout = (templates: []): Layouts => {
  return templates.reduce(
    (i, v) => {
      const { type, name, html } = v;

      const layout = { ...i[type], [name]: stringTemplateReplace(html) };

      return (i = { ...i, [type]: { ...layout } });
    },
    { internal: {}, external: {}, general: {} }
  );
};
