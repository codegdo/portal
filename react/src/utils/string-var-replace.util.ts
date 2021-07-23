const keys = [
  {
    key: '{program}',
    value: 'program',
  }
];

export const stringVarReplace = (template: string, obj: { [key: string]: string }): string => {
  return keys.reduce((t, v) => {
    const key = new RegExp(v.key, 'g');
    return (t = t.replace(key, obj[v.value]));
  }, template);
};
