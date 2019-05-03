import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import user from './user';
import info from './info';
import ui from './ui';

const reducers = combineReducers({
  user,
  info,
  ui,
});

export function initializeStore() {
  return createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  );
}
