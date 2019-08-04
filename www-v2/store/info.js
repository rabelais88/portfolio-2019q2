// main page storage for picking up the recent story + recent stack info
// @ts-check
/// <reference path="./post.types.d.ts" />

import api from '../api';

export const getInfoInitialState = () => ({
  intro: '',
  stacks: [],
  stackKeyword: '',
  isLoaded: false,
});
const infoInitialState = getInfoInitialState();

/**
 * @type {}
 */
export const INFO_ACTIONS = {
  SET_INTRO: 'SET_INTRO',
  SET_STACKS: 'SET_STACKS',
  SET_STACK_KEYWORD: 'SET_STACK_KEYWORD',
  INIT_INFO: 'INIT_INFO',
  SET_READY: 'SET_READY',
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
    case INFO_ACTIONS.INIT_POSTS:
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
    await dispatch({ type: INFO_ACTIONS.SET_LATEST, payload: introData });
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
