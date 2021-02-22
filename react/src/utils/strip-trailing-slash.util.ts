export function stripTrailingSlash(url: string) {
  return url.split('/').filter(Boolean).join('/').replace(':/', '://');
}
