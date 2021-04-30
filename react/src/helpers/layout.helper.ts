type Layouts = {
  external: { [x: string]: string };
  internal: { [x: string]: string };
  na: { [x: string]: string };
};

export const mapTemplateToLayout = (templates: any[]): Layouts => {
  const layouts = templates.reduce((i, v) => {
    const { type, name, html } = v;
    const layout = { ...i[type], [name]: html };

    return (i = { ...i, [type]: { ...layout } });
  }, {});

  return layouts;
};
