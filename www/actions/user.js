import { Cookies } from 'react-cookie';
import { toast } from 'react-toastify';

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
  const errorHandler = err => {
    if (err.response.status === 401) {
      toast.error('wrong email or password.');
      dispatch(logout());
    }
  };
  const api = new Api().onError(errorHandler);
  api.postLogin({ email, password }).then(res => {
    const { token, username } = res;
    toast.success('logged in!');
    // console.log('login succeed', token, username);
    cookies.set('token', token);
    dispatch(setUser({ email, token, username }));
  }).catch(err => {});
};
