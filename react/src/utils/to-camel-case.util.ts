const underscoreRegex = /(?:[^\w\s]|_)+/g,
  sandwichNumberRegex = /(\d)\s+(?=\d)/g,
  camelCaseRegex = /(?:^\s*\w|\b\w|\W+)/g;

export function toCamelCase(str: string) {
  if (/^\s*_[\s_]*$/g.test(str)) {
    return '_';
  }

  return str
    .replace(underscoreRegex, ' ')
    .replace(sandwichNumberRegex, '$1_')
    .replace(camelCaseRegex, function (match, index) {
      if (/^\W+$/.test(match)) {
        return '';
      }

      return index == 0 ? match.trimLeft().toLowerCase() : match.toUpperCase();
    });
}
