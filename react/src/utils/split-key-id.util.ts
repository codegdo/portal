export function splitKeyId(str: string) {
  const regexId = /[0-9]/g;
  const regexKey = /[a-zA-Z]/g;

  const id = str.match(regexId)?.join('');
  const key = str.match(regexKey)?.join('');

  return {
    key,
    id,
  };
}
