import { AnyAction } from 'redux';
import {
  LayoutState,
  UPDATE_EXTERNAL,
  UPDATE_INTERNAL,
  UPDATE_NA,
  UPDATE_LAYOUTS,
} from './layout.type';

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
        external: { ...action.payload.external },
      };
    }
    case UPDATE_INTERNAL: {
      return {
        ...state,
        internal: { ...action.payload.internal },
      };
    }
    case UPDATE_NA: {
      console.log(state);
      return {
        ...state,
        na: { ...state.na, ...action.payload },
      };
    }
    case UPDATE_LAYOUTS: {
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
