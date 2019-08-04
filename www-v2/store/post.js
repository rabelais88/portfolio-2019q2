// main page storage for picking up the recent story + recent stack info
// @ts-check
/// <reference path="./post.types.d.ts" />

import api from '../api';

const getDefaultPost = () => ({
  title: '...',
  _id: '',
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const getPostInitialState = () => ({
  posts: [],
  latestPosts: new Array(3).fill(null).map(() => getDefaultPost()),
});
const postInitialState = getPostInitialState();

/**
 * @type {PostTypes.POST_ACTIONS}
 */
export const POST_ACTIONS = {
  SET_LATEST: 'SET_LATEST',
  SET_POSTS: 'SET_POSTS',
  SET_POST: 'SET_POST',
  PUT_COMMENT: 'PUT_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
  INIT_POSTS: 'INIT_POSTS',
};

// REDUCERS
export const postReducer = (state = postInitialState, action) => {
  switch (action.type) {
    case POST_ACTIONS.SET_LATEST:
      return {
        ...state,
        latestPosts: action.payload,
      };
    case POST_ACTIONS.INIT_POSTS:
      return getPostInitialState();
    default:
      return state;
  }
};

// ACTIONS

/**
 * @function
 * @example
 * dispatch(getLatestPost());
 */
export const getLatestPost = () => async (dispatch, getState) => {
  // console.log('getLatestPost', getState());
  try {
    const latestPostData = await api('/info/posts', 'get', { page: 1, limit: 3 });
    const latestPosts = latestPostData.docs;
    // console.log('latest post', latestPost);
    await dispatch({ type: POST_ACTIONS.SET_LATEST, payload: latestPosts });
  } catch (err) {
    console.error(err);
  }
};

/**
 * @function
 * @example
 * dispatch(initPost());
 */
export const initPost = () => async (dispatch, getState) => {
  await dispatch({ type: POST_ACTIONS.INIT_POSTS });
};