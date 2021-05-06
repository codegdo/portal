export const UPDATE_LAYOUT_EXTERNAL = 'theme/UPDATE_LAYOUT_EXTERNAL';
export const UPDATE_LAYOUT_INTERNAL = 'theme/UPDATE_LAYOUT_INTERNAL';
export const UPDATE_LAYOUT_GENERAL = 'theme/UPDATE_LAYOUT_GENERAL';
export const UPDATE_LAYOUT = 'theme/UPDATE_LAYOUT';

export interface LayoutState {
  external: { [x: string]: string };
  internal: { [x: string]: string };
  general: { [x: string]: string };
}
