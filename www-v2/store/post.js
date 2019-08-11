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
  page: 1,
  keyword: '',
  currentPost: null,
  latestPosts: new Array(3).fill(null).map(() => getDefaultPost()),
  totalPages: 1,
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
  SET_PAGE: 'SET_PAGE',
};

// REDUCERS
export const postReducer = (state = postInitialState, action) => {
  switch (action.type) {
    case POST_ACTIONS.SET_LATEST:
      return {
        ...state,
        latestPosts: action.payload,
      };
    case POST_ACTIONS.SET_POSTS:
      return {
        ...state,
        ...action.payload,
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
    const latestPostData = await api('/info/posts', 'get', {
      page: 1,
      limit: 3,
    });
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

export const getPosts = () => async (dispatch, getState) => {
  const { work } = getState();
  try {
    const postsData = await api('/info/posts', 'get', {
      page: work.page,
      limit: 10,
    });
    const posts = postsData.docs;
    const { totalPages, page } = postsData;
    await dispatch({ type: POST_ACTIONS.SET_POSTS, payload: { posts, totalPages, page } });
  } catch (err) {
    console.error(err);
  }
};

export const setPage = page => async (dispatch, getState) => {
  await dispatch({ type: POST_ACTIONS.SET_PAGE, payload: page });
  await dispatch(getPosts());
};

export const openPost = postId => async (dispatch, getState) => {
  try {
    const postData = await api(`/info/posts/${postId}`);
    await dispatch({ type: POST_ACTIONS.SET_POST, payload: postData });
  } catch (err) {
    console.error(err);
  }
};

export const closePost = () => async (dispatch, getState) => {
  await dispatch({ type: POST_ACTIONS.SET_POST, payload: null });
};

export const prevPage = () => async (dispatch, getState) => {
  const { post } = getState();
  if (post.page - 1 >= 1) await dispatch(setPage(post.page - 1));
};

export const nextPage = () => async (dispatch, getState) => {
  const { post } = getState();
  if (post.page < post.totalPages) await dispatch(setPage(post.page + 1));
};
