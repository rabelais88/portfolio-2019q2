import { SET_USER, LOGOUT } from '../actions/user';

const defaultState = {
  auth: false,
  email: '',
  token: null,
};
const userReducer = (state = defaultState, action) => {
  switch(action.type) {
    case SET_USER:
      return {...state, auth: true, ...action.userInfo };
    case LOGOUT:
      return defaultState;
    default:
      return state
  }
}

export default userReducer;