import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';

import { persistedReducer } from './store/reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(persistedReducer, composeEnhancers(applyMiddleware()));
const persistor = persistStore(store);

export { store, persistor };
