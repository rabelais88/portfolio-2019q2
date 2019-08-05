import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { enhanceAll } from '../lib/util';
import { getCountInitialState, countReducer } from './count';
import { getPostInitialState, postReducer } from './post';
import { getInfoInitialState, infoReducer } from './info';

const combinedInitialState = {
  count: getCountInitialState(),
  post: getPostInitialState(),
  info: getInfoInitialState(),
};

const reducers = combineReducers({
  count: countReducer,
  post: postReducer,
  info: infoReducer,
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
