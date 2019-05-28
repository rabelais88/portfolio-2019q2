
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
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(res => {
          commit('SET_TOKEN', res.token);
          setToken(res.token);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(res => {
          if (!res) {
            reject('Verification failed, please Login again.');
          }

          const { username, email } = res;

          commit('SET_NAME', username);
          commit('SET_EMAIL', email);
          // commit('SET_AVATAR', avatar)
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
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
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '');
      removeToken();
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
