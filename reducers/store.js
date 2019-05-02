import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import user from './user';
import info from './info';

const reducers = combineReducers({
  user,
  info,
});

export function initializeStore() {
  return createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  );
}
