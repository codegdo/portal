import { AnyAction } from 'redux';
import { LayoutState, UPDATE_EXTERNAL, UPDATE_INTERNAL } from './layout.type';

import { mainExternal, mainInternal, mainNA } from '../../layouts';

const initialState: LayoutState = {
  external: {
    main: mainExternal,
  },
  internal: {
    main: mainInternal,
  },
  na: {
    main: mainNA,
  },
};

export const layoutReducer = (
  state = initialState,
  action: AnyAction
): LayoutState => {
  switch (action.type) {
    case UPDATE_EXTERNAL: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case UPDATE_INTERNAL: {
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
