import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { enhanceAll } from '../lib/util';
import { countInitialState, countReducer } from './count';

const combinedInitialState = {
  count: countInitialState,
};

const reducers = combineReducers({
  count: countReducer,
});

const persistConfig = {
  key: 'primary',
  storage,
  whitelist: ['count'], // place to select which state you want to persist
};
const persistedReducer = persistReducer(persistConfig, reducers);

const initializeStore = (initialState = combinedInitialState) =>
  createStore(
    persistedReducer,
    initialState,
    enhanceAll(thunkMiddleware, [applyMiddleware, composeWithDevTools]),
  );

export default initializeStore;
