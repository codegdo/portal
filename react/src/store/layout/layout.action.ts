import { AnyAction } from 'redux';
import {
  LayoutState,
  UPDATE_LAYOUT_EXTERNAL,
  UPDATE_LAYOUT_INTERNAL,
  UPDATE_LAYOUT_NA,
  UPDATE_LAYOUT,
} from './layout.type';

export function updateExternal(layouts: LayoutState): AnyAction {
  return {
    type: UPDATE_LAYOUT_EXTERNAL,
    payload: layouts,
  };
}

export function updateInternal(layouts: LayoutState): AnyAction {
  return {
    type: UPDATE_LAYOUT_INTERNAL,
    payload: layouts,
  };
}

export function updateNA(na: { [x: string]: string }): AnyAction {
  return {
    type: UPDATE_LAYOUT_NA,
    payload: na,
  };
}

export function updateLayout(layout: LayoutState): AnyAction {
  return {
    type: UPDATE_LAYOUT,
    payload: layout,
  };
}
