type Error = {
  [x: string]: any;
};
export const errorsToObject = (errors: Error[]) => {
  return errors.reduce((i, v) => {
    const { property, constraints } = v;
    const str = Object.keys(constraints)
      .map((k) => {
        return constraints[k];
      })
      .join('\n');

    i[property] = str;
    return i;
  }, {});
};
