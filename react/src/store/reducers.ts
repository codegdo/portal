import { AnyAction, combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { AppState } from './types';
import { sessionReducer } from './session/session.reducer';

export const appReducer = combineReducers({
  session: sessionReducer,
});

const rootReducer = (state: AppState | undefined, action: AnyAction): AppState => {
  // reset store
  if (action.type === 'session/DELETE_SESSION') {
    storage.removeItem('persist:root');
    state = undefined;

    console.log('reset store');
  }
  return appReducer(state, action);
};

export const persistedReducer = persistReducer(
  { key: 'root', storage },
  rootReducer
);
