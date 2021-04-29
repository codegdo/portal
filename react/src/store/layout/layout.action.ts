import { AnyAction } from 'redux';
import {
  LayoutState,
  UPDATE_EXTERNAL,
  UPDATE_INTERNAL,
  UPDATE_NA,
  UPDATE_LAYOUTS,
} from './layout.type';

export function updateExternal(layouts: LayoutState): AnyAction {
  return {
    type: UPDATE_EXTERNAL,
    payload: layouts,
  };
}

export function updateInternal(layouts: LayoutState): AnyAction {
  return {
    type: UPDATE_INTERNAL,
    payload: layouts,
  };
}

export function updateNA(na: { [x: string]: string }): AnyAction {
  return {
    type: UPDATE_NA,
    payload: na,
  };
}

export function updateLayouts(layouts: LayoutState): AnyAction {
  return {
    type: UPDATE_LAYOUTS,
    payload: layouts,
  };
}
