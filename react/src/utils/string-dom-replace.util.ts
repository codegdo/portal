const parser = new DOMParser();

export const stringDomReplace = (template: string): string => {
  const doc = parser.parseFromString(template, 'text/html');

  doc.querySelectorAll('a').forEach(a => {
    const str = a.outerHTML;
    const href = a.getAttribute('href') || '#';
    const text = a.innerText;
    const link = `<Link to="${href}">${text}</Link>`;

    template = template.replace(str, link);
  });

  return template;
};
