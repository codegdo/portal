import { splitStringKeyId } from './split-string-key-id.util';

export function splitObjectKeyId(values: any): {}[] {
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
