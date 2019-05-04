import _get from 'lodash/get';
import { logout } from './user';
import Api from '../utils/Api';
import { toast } from "react-toastify";

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
const apiAuthFactory = (apiFuncName, actOnSuccess) => (router, arg) => (dispatch, getState) => {
  // console.log('getindex. getstate', getState());
  const token = _get(getState(), 'user.token');
  const errorHandle = (err) => {
    console.log(err.response)
    if (err.response.status === 401) {
      toast.error('token outdated, cannot proceed');
      dispatch(logout());
      router.push('/');
    } else {
      toast.error(JSON.stringify(err.response.data));
    }
  };
  const api = new Api().onError(errorHandle).setToken(token);
  api[apiFuncName](arg).then(res => {
    if (actOnSuccess) dispatch(actOnSuccess(res));
  });
};

// all these redux-thunk actions must provide router
/**
 * @example
 * dispatch(asyncGetIndex(router));
 * dispatch(asyncCreatePost(router, arg))
 */
export const asyncGetIndex = apiAuthFactory('getIndex', setIndex);
export const asyncGetStacks = apiAuthFactory('getStacks', setStacks);

/**
 * @example
 * dispatch(asyncSetIndex(router, data));
 */
export const asyncSetIndex = apiAuthFactory('setIndex', setIndex);
export const asyncSetStacks = apiAuthFactory('setIndex', setIndex);
export const asyncCreatePost = apiAuthFactory('createPost');
