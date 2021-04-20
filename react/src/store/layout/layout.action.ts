import { AnyAction } from 'redux';
import { LayoutState, UPDATE_EXTERNAL, UPDATE_INTERNAL } from './layout.type';

export function updateExternal(layouts: LayoutState): AnyAction {
  return {
    type: UPDATE_EXTERNAL,
    payload: layouts,
  };
}
