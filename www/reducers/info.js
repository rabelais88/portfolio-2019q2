import _set from 'lodash/set';
import { SET_INTRO, SET_STACKS, SET_STACK, ADD_POST } from '../actions/info';

const defaultState = {
  intro: '',
  stacks: [],
  editingPost: [],
};
const infoReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_INTRO:
      return { ...state, intro: action.payload };
    case SET_STACKS:
      return { ...state, stacks: action.payload };
    case SET_STACK:
      return { ...state, stacks: _set(state.stacks, action.idx, action.payload) };
    case ADD_POST:
      return { ...state, editingPost: action.payload };
    default:
      return state;
  }
};

export default infoReducer;
