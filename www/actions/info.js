import _get from 'lodash/get';
import { logout } from './user';
import Api from '../utils/Api';
import { toast } from "react-toastify";

export const SET_INTRO = 'SET_INTRO';
export const SET_STACKS = 'SET_STACKS';
export const SET_STACK = 'SET_STACK';
export const ADD_POST = 'ADD_POST';

export const setIntro = payload => ({
  type: SET_INTRO,
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
const apiAuthFactory = (apiFuncName, actOnSuccess) => (router, arg, toastOnSuccess) => (dispatch, getState) => {
  // console.log('getintro. getstate', getState());
  const token = _get(getState(), 'user.token');
  // const errorHandle = (err) => {
  //   console.log(err.response)
  //   if (err.response.status === 401) {
  //     toast.error('token outdated, please log in');
  //     dispatch(logout());
  //     router.push('/');
  //   } else {
  //     toast.error(JSON.stringify(err.response.data));
  //   }
  // };
  const api = new Api().setToken(token);
  api[apiFuncName](arg).then(res => {
    if (res && actOnSuccess) {
      if (typeof toastOnSuccess === 'string') toast.success(toastOnSuccess);
      dispatch(actOnSuccess(res));
    }
    if (!res) {
      console.log('error!');
    }
  });
};

// all these redux-thunk actions must provide router
/**
 * @example
 * dispatch(asyncGetIndex(router));
 * dispatch(asyncCreatePost(router, arg))
 */
export const asyncGetIndex = apiAuthFactory('getIndex', setIntro);
export const asyncGetStacks = apiAuthFactory('getStacks', setStacks);

/**
 * @example
 * dispatch(asyncSetIndex(router, data));
 */
export const asyncSetInro = apiAuthFactory('setIndex', setIntro);
export const asyncSetStacks = apiAuthFactory('setIndex', setIntro);
export const asyncCreatePost = apiAuthFactory('createPost');
