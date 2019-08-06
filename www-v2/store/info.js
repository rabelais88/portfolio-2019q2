// main page storage for picking up the recent story + recent stack info
// @ts-check
/// <reference path="./info.types.d.ts" />

import _debounce from 'lodash/debounce';

import api from '../api';

export const getInfoInitialState = () => ({
  intro: '',
  stacks: [],
  stackKeyword: '',
  isLoaded: false,
});
const infoInitialState = getInfoInitialState();

/**
 * @type {InfoTypes.INFO_ACTIONS}
 */
export const INFO_ACTIONS = {
  SET_INTRO: 'SET_INTRO',
  SET_STACKS: 'SET_STACKS',
  SET_STACK_KEYWORD: 'SET_STACK_KEYWORD',
  INIT_INFO: 'INIT_INFO',
  SET_READY: 'SET_READY',
  SET_LATEST: 'SET_LATEST',
};

// REDUCERS
export const infoReducer = (state = infoInitialState, action) => {
  switch (action.type) {
    case INFO_ACTIONS.SET_READY:
      return {
        ...state,
        isLoaded: action.payload,
      };
    case INFO_ACTIONS.SET_INTRO:
      return {
        ...state,
        intro: action.payload,
      };
    case INFO_ACTIONS.SET_STACK_KEYWORD:
      return {
        ...state,
        stackKeyword: action.payload,
      };
    case INFO_ACTIONS.SET_STACKS:
      return {
        ...state,
        stacks: action.payload,
      };
    case INFO_ACTIONS.INIT_INFO:
      return getInfoInitialState();
    default:
      return state;
  }
};

// ACTIONS

/**
 * @function
 * @example
 * dispatch(getIntro());
 */
export const getIntro = () => async (dispatch, getState) => {
  try {
    const introData = await api('/info/intro');
    await dispatch({ type: INFO_ACTIONS.SET_INTRO, payload: introData });
  } catch (err) {
    console.error(err);
  }
};

/**
 * @function
 * @example
 * dispatch(initInfo());
 */
export const initInfo = () => async (dispatch, getState) => {
  await dispatch({ type: INFO_ACTIONS.INIT_INFO });
  await dispatch(getIntro());
  await dispatch({ type: INFO_ACTIONS.SET_READY, payload: true });
};

export const getStacks = () => async (dispatch, getState) => {
  const { info } = getState();
  const searchOpts = { page: 1, limit: 10 };
  if (info.stackKeyword !== '') searchOpts.search = info.stackKeyword;
  const stacks = await api('/info/stacks', 'get', searchOpts);
  await dispatch({ type: INFO_ACTIONS.SET_STACKS, payload: stacks });
};

// eslint-disable-next-line
// export const getStacksDebounced = _debounce(() => getStacks, 500);

export const setStackKeyword = keyword => async (dispatch, getState) => {
  await dispatch({ type: INFO_ACTIONS.SET_STACK_KEYWORD, payload: keyword });
  await dispatch(getStacks);
};
