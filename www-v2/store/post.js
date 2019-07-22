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
  GET_LATEST: 'GET_LATEST',
  GET_PAGE: 'GET_PAGE',
  GET_POST: 'GET_POST',
  PUT_COMMENT: 'PUT_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
  INIT_POSTS: 'INIT_POSTS',
};

// REDUCERS
export const postReducer = (state = postInitialState, action) => {
  switch (action.type) {
    case POST_ACTIONS.GET_LATEST:
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
 * @param {Number} num - number to add
 * @example
 * dispatch(addCount(1));
 */
export const addCount = num => async (dispatch, getState) => {
  console.log('addcount triggered', getState(), num);
  await dispatch({ type: COUNT_ACTIONS.ADD_COUNT, payload: num });
  await dispatch({
    type: COUNT_ACTIONS.SET_LAST_ACTION,
    payload: COUNT_ACTIONS.ADD_COUNT,
  });
};

/**
 * @function
 * @param {Number} num - number to subtract
 * @example
 * dispatch(subCount(1));
 */
export const subCount = num => async (dispatch, getState) => {
  console.log('subcount triggered', getState(), num);
  await dispatch({ type: COUNT_ACTIONS.SUB_COUNT, payload: num });
  await dispatch({
    type: COUNT_ACTIONS.SET_LAST_ACTION,
    payload: COUNT_ACTIONS.SUB_COUNT,
  });
};

/**
 * @function
 * @example
 * dispatch(initCount());
 */
export const initCount = () => async (dispatch, getState) => {
  await dispatch({ type: COUNT_ACTIONS.INIT_COUNT });
};
