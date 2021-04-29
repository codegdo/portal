export const UPDATE_EXTERNAL = 'theme/UPDATE_EXTERNAL';
export const UPDATE_INTERNAL = 'theme/UPDATE_INTERNAL';
export const UPDATE_NA = 'theme/UPDATE_NA';
export const UPDATE_LAYOUTS = 'theme/UPDATE_LAYOUTS';

export interface LayoutState {
  external: { [x: string]: string };
  internal: { [x: string]: string };
  na: { [x: string]: string };
}
