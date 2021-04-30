import { AnyAction } from 'redux';
import {
  LayoutState,
  UPDATE_LAYOUT_EXTERNAL,
  UPDATE_LAYOUT_INTERNAL,
  UPDATE_LAYOUT_NA,
  UPDATE_LAYOUT,
} from './layout.type';

const initialState: LayoutState = {
  internal: {},
  external: {},
  na: {},
};

export const layoutReducer = (
  state = initialState,
  action: AnyAction
): LayoutState => {
  switch (action.type) {
    case UPDATE_LAYOUT_INTERNAL: {
      return {
        ...state,
        internal: { ...state.internal, ...action.payload },
      };
    }
    case UPDATE_LAYOUT_EXTERNAL: {
      return {
        ...state,
        external: { ...state.external, ...action.payload },
      };
    }
    case UPDATE_LAYOUT_NA: {
      return {
        ...state,
        na: { ...state.na, ...action.payload },
      };
    }
    case UPDATE_LAYOUT: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
