export const SET_USER = 'SET_USER';
export const LOGOUT = 'LOGOUT';

export const setUser = userInfo => ({
  type: SET_USER,
  userInfo,
})

export const logout = userInfo => ({
  type: LOGOUT
})