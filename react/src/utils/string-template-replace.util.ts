const keys = [
  {
    key: '{{content}}',
    value: '<Content {...props}/>',
  },
  {
    key: '{{nav_main}}',
    value: '<NavMain {...props} />',
  },
];

export const stringTemplateReplace = (template: string): string => {
  return keys.reduce((t, v) => {
    const key = new RegExp(v.key, 'g');
    return (t = t.replace(key, v.value));
  }, template);
};
