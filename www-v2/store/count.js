export const getCountInitialState = () => ({
  number: 0,
  lastAction: null,
});
const countInitialState = getCountInitialState();

/**
 * @type {Object}
 * @property {string} ADD_COUNT
 * @property {string} SUB_COUNT
 * @property {string} SET_LAST_ACTION
 * @property {string} INIT_COUNT
 */
export const COUNT_ACTIONS = {
  ADD_COUNT: 'ADD_COUNT',
  SUB_COUNT: 'SUB_COUNT',
  SET_LAST_ACTION: 'SET_LAST_ACTION',
  INIT_COUNT: 'INIT_COUNT',
};

// REDUCERS
export const countReducer = (state = countInitialState, action) => {
  switch (action.type) {
    case COUNT_ACTIONS.ADD_COUNT:
      return {
        ...state,
        number: state.number + action.payload,
      };
    case COUNT_ACTIONS.SUB_COUNT:
      return {
        ...state,
        number: state.number - action.payload,
      };
    case COUNT_ACTIONS.SET_LAST_ACTION:
      return {
        ...state,
        lastAction: action.payload,
      };
    case COUNT_ACTIONS.INIT_COUNT:
      return getCountInitialState();
    default:
      return state;
  }
};

// ACTIONS

// export const serverRenderClock = isServer => dispatch => {
//   return dispatch({ type: actionTypes.TICK, light: !isServer, ts: Date.now() });
// };

// export const startClock = dispatch => {
//   return setInterval(() => {
//     dispatch({ type: actionTypes.TICK, light: true, ts: Date.now() });
//   }, 1000);
// };

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
