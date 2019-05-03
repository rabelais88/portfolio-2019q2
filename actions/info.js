import _get from 'lodash/get';
import { logout } from './user';
import Api from '../utils/Api';

export const SET_INDEX = 'SET_INDEX';
export const SET_STACKS = 'SET_STACKS';
export const SET_STACK = 'SET_STACK';
export const ADD_POST = 'ADD_POST';

export const setIndex = payload => ({
  type: SET_INDEX,
  payload,
});

export const setStacks = payload => ({
  type: SET_STACKS,
  payload,
});

export const setStack = (idx, payload) => ({
  type: SET_STACK,
  idx,
  payload,
});

/**
 * create auth function with given api function name and redux action
 * @param {String} [apiFuncName] api's property name
 * @param {Function} [actOnSuccess] action creator
 * @return {function} redux-thunk function
 */
const authFetchFactory = (apiFuncName, actOnSuccess) => (router) => (dispatch, getState) => {
  // console.log('getindex. getstate', getState());
  const token = _get(getState(), 'user.token');
  const errorHandle = () => {
    dispatch(logout());
    router.push('/');
  };
  const api = new Api().onError(errorHandle).setToken(token);
  api[apiFuncName]().then(res => {
    dispatch(actOnSuccess(res));
  });
};

// all these redux-thunk actions must provide router
/**
 * @example
 * dispatch(asyncGetIndex(router));
 */
export const asyncGetIndex = authFetchFactory('getIndex', setIndex);
export const asyncGetStacks = authFetchFactory('getStacks', setStacks);
