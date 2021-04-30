export const UPDATE_LAYOUT_EXTERNAL = 'theme/UPDATE_LAYOUT_EXTERNAL';
export const UPDATE_LAYOUT_INTERNAL = 'theme/UPDATE_LAYOUT_INTERNAL';
export const UPDATE_LAYOUT_NA = 'theme/UPDATE_LAYOUT_NA';
export const UPDATE_LAYOUT = 'theme/UPDATE_LAYOUT';

export interface LayoutState {
  external: { [x: string]: string };
  internal: { [x: string]: string };
  na: { [x: string]: string };
}
