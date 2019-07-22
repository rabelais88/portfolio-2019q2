// main page storage for picking up the recent story + recent stack info
// @ts-check
/// <reference path="./post.types.d.ts" />
export const getPostInitialState = () => ({
  posts: [],
  latestPost: null,

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
        latestPost: action.payload,
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
export const getLatestPost = num => async (dispatch, getState) => {
  console.log('getLatestPost', getState());
  // await 
  await dispatch({ type: POST_ACTIONS.SET_LATEST, payload: num });
};

/**
 * @function
 * @example
 * dispatch(initPost());
 */
export const initPost = () => async (dispatch, getState) => {
  await dispatch({ type: POST_ACTIONS.INIT_POSTS });
};
