export const UPDATE_EXTERNAL = 'theme/UPDATE_EXTERNAL';
export const UPDATE_INTERNAL = 'theme/DELETE_INTERNAL';

export interface LayoutState {
  external: { [x: string]: string };
  internal: { [x: string]: string };
  na: { [x: string]: string };
}
