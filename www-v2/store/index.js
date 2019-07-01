import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { enhanceAll } from '../lib/util';
import { countInitialState, countReducer } from './count';

const combinedInitialState = {
  count: countInitialState,
};

const reducers = combineReducers({
  count: countReducer,
});

const initializeStore = (initialState = combinedInitialState) =>
  createStore(
    reducers,
    initialState,
    enhanceAll(thunkMiddleware, [applyMiddleware, composeWithDevTools]),
  );

export default initializeStore;
