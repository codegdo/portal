const parser = new DOMParser();
const keys = [
  {
    key: '{{content}}',
    value: '<Content {...props}/>',
  },
  {
    key: '{{nav_main}}',
    value: '<NavMain {...props} />',
  },
  {
    key: '{{nav_menu}}',
    value: '<NavMenu {...props} />',
  }
];

export const stringTemplateReplace = (template: string): string => {
  const doc = parser.parseFromString(template, 'text/html');

  doc.querySelectorAll('a').forEach(a => {
    const str = a.outerHTML;
    const href = a.getAttribute('href') || '#';
    const text = a.innerText;
    const link = `<Link to="${href}">${text}</Link>`;

    template = template.replace(str, link);
  });


  return keys.reduce((t, v) => {
    const key = new RegExp(v.key, 'g');
    return (t = t.replace(key, v.value));
  }, template);
};
