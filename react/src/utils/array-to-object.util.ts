export interface ArrayToObject {
  data: any[];
  id: string;
  key?: string;
  value?: any;
}

export function arrayToObject(
  obj: ArrayToObject
): { [x: string]: string | number | boolean } {
  const { data, id, key, value } = obj;

  return data.reduce((i, v) => {
    const keyId = v[id] + '_' + v.id;

    key !== undefined
      ? (i[keyId] = v[key] || '')
      : (i[keyId] = value !== undefined ? value : v);

    return i;
  }, {});
}
