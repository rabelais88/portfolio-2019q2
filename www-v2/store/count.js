export const countInitialState = {
  number: 0,
  lastAction: null,
};

export const COUNT_ACTIONS = {
  ADD_COUNT: 'ADD_COUNT',
  SUB_COUNT: 'SUB_COUNT',
  SET_LAST_ACTION: 'SET_LAST_ACTION',
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

export const addCount = num => async (dispatch, getState) => {
  console.log('addcount triggered', getState(), num);
  await dispatch({ type: COUNT_ACTIONS.ADD_COUNT, payload: num });
  await dispatch({
    type: COUNT_ACTIONS.SET_LAST_ACTION,
    payload: COUNT_ACTIONS.ADD_COUNT,
  });
};

export const subCount = num => async (dispatch, getState) => {
  console.log('subcount triggered', getState(), num);
  await dispatch({ type: COUNT_ACTIONS.SUB_COUNT, payload: num });
  await dispatch({
    type: COUNT_ACTIONS.SET_LAST_ACTION,
    payload: COUNT_ACTIONS.SUB_COUNT,
  });
};
