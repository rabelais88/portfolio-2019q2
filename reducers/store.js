import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import user from './user';
import admin from './admin';

const reducers = combineReducers({
  user,
  admin,
});

export function initializeStore() {
  return createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  );
}
