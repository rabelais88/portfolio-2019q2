// main page storage for picking up the recent story + recent stack info
// @ts-check

import api from '../api';

export const getInfoInitialState = () => ({
  intro: '',
  stacks: [],
  stackKeyword: '',
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
  SET_LATEST: 'SET_LATEST',
};

// REDUCERS
export const infoReducer = (state = infoInitialState, action) => {
  switch (action.type) {
    case INFO_ACTIONS.SET_LATEST:
      return {
        ...state,
        latestPosts: action.payload,
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
  // console.log('getLatestPost', getState());
  try {
    const latestPostData = await api('/info/posts', 'get', { page: 1, limit: 3 });
    const latestPosts = latestPostData.docs;
    // console.log('latest post', latestPost);
    await dispatch({ type: INFO_ACTIONS.SET_LATEST, payload: latestPosts });
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
};
