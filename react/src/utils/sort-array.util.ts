export function sortArray(values: [], key: string): [] {
  return values.sort((a, b) => {
    return ((a[key] < b[key]) ? -1 : ((a[key] > b[key]) ? 1 : 0));
  })
}