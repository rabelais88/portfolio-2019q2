import { Cookies } from 'react-cookie';
import Api from '../utils/Api';

export const SET_USER = 'SET_USER';
export const LOGOUT = 'LOGOUT';
export const LOGIN = 'LOGIN';

const cookies = new Cookies();

export const setUser = userInfo => ({
  type: SET_USER,
  userInfo,
});

export const logout = () => {
  cookies.remove('token');
  return { type: LOGOUT }; // this will empty setUser(null);
};

export const asyncLogin = (email, password) => (dispatch, getState) => {
  const api = new Api().onError(err => dispatch(logout()));
  api.postLogin({ email, password }).then(({ token, username }) => {
    console.log('login succeed', token, username);
    cookies.set('token', token);
    dispatch(setUser({ email, token, username }));
  });
};
