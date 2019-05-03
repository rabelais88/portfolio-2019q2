import _get from 'lodash/get';
import { logout } from './user';
import Api from '../utils/Api';

export const SET_INDEX = 'SET_INDEX';
export const SET_STACKS = 'SET_STACKS';
export const ADD_POST = 'ADD_POST';

export const setIndex = payload => ({
  type: SET_INDEX,
  payload,
});

export const setStacks = payload => ({
  type: SET_STACKS,
  payload,
});

export const asyncGetIndex = () => (dispatch, getState) => {
  // console.log('getindex. getstate', getState());
  const token = _get(getState(), 'user.token');
  const api = new Api().onError(dispatch(logout)).setToken(token);
  console.log(api);
  api.getIndex().then(indexMarkdown => {
    dispatch(setIndex(indexMarkdown));
  });
  return null;
};

export const asyncGetStacks = () => (dispatch, getState) => {
  const token = _get(getState(), 'user.token');
  const api = new Api().onError(dispatch(logout)).setToken(token);
  console.log(api);
  api.getStacks().then(stacks => {
    dispatch(setStacks(stacks));
  });
  return null;
};
