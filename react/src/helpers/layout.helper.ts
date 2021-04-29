export const mapTemplateToLayout = (templates: any) => {
  const layouts = templates.reduce(() => {}, {
    internal: {},
    external: {},
    na: {},
  });
  return layouts;
};
