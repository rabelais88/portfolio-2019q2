
import { login, getInfo } from '@/api/user';
import { getToken, setToken, removeToken } from '@/utils/auth';
import { resetRouter } from '@/router';

const state = {
  token: getToken(),
  name: '',
  email: '',
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_EMAIL: (state, email) => { state.email = email; },
};

const actions = {
  // user login
  async login({ commit }, userInfo) {
    const { username, password } = userInfo;
    const res = await login({ username: username.trim(), password: password });
    commit('SET_TOKEN', res.token);
    setToken(res.token);
    return res;
  },
  // get user info
  async getInfo({ commit, state }) {
    const res = await getInfo(state.token);
    if (!res) throw Error('Verification failed, please login again');
    const { username, email } = res;
    commit('SET_NAME', username);
    commit('SET_EMAIL', email);
    return res;
  },

  // user logout
  logout({ commit, state }) {
    // return new Promise((resolve, reject) => {
    // logout(state.token).then(() => {
    commit('SET_TOKEN', '');
    removeToken();
    resetRouter();
    // resolve()
    // }).catch(error => {
    //   reject(error)
    // })
    // })
  },

  // remove token
  async resetToken({ commit }) {
    commit('SET_TOKEN', '');
    removeToken();
    return;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
