const keys = [
  {
    key: '{content}',
    value: '<Content {...props}/>',
  },
  {
    key: '{nav_main}',
    value: '<NavMain {...props} />',
  },
  {
    key: '{nav_sub}',
    value: '<NavSub {...props} />',
  },
  {
    key: '{nav_menu}',
    value: '<NavMenu {...props} />',
  },
  {
    key: '{nav_menu_profile}',
    value: '<NavMenuProfile {...props} />',
  },
];

export const stringComponentReplace = (template: string): string => {
  return keys.reduce((t, v) => {
    const key = new RegExp(v.key, 'g');
    return (t = t.replace(key, v.value));
  }, template);
};
