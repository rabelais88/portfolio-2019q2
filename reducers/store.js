import user from './user';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

const reducers = combineReducers({
  user
});

export function initializeStore() {
  return createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));
}