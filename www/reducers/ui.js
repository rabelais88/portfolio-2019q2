import { MENU_OPEN, MENU_CLOSE } from '../actions/ui';

const defaultState = {
  menuVisible: false,
};

const uiReducer = (state = defaultState, action) => {
  switch (action.type) {
    case MENU_OPEN:
      return { ...state, menuVisible: true };
    case MENU_CLOSE:
      return { ...state, menuVisible: false };
    default:
      return state;
  }
};

export default uiReducer;
