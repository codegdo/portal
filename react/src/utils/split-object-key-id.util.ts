import { splitStringKeyId } from './split-string-key-id.util';

export function splitObjectKeyId(values: { [key: string]: string }): {
  keyFields: { [key: string]: string };
  idFields: { [key: string]: string };
} {
  return Object.entries(values).reduce(
    (a, i) => {
      const { key, id } = splitStringKeyId(i[0]);
      const value = i[1];

      a.keyFields = { ...a.keyFields, [key]: value };
      a.idFields = { ...a.idFields, [id]: value };

      return a;
    },
    { keyFields: {}, idFields: {} }
  );
}

/* export function splitObjectKeyId(values: {[key: string]: string}): {}[] {
  return Object.entries(values).reduce(
    (a, i) => {
      const { key, id } = splitStringKeyId(i[0]);
      const value = i[1];
      a[0] = { ...a[0], [key]: value };
      a[1] = { ...a[1], [id]: value };
      return a;
    },
    [{}, {}]
  );
}
 */
