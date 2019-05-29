import { getIntro, saveIntro } from '@/api/editing';
import { Notification } from 'element-ui'

const state = {
  intro: '',
  stacks: [],
  posts: [],
};

const mutations = {
  SET_INTRO(state, payload) {
    state.intro = payload;
  },
};

const actions = {
  async getIntro({ commit }) {
    const intro = await getIntro();
    commit('SET_INTRO', intro);
  },
  async saveIntro({ commit }, intro) {
    const res = await saveIntro(intro);
    if (res) Notification.success({ message: 'successfully updated intro' });
    commit('SET_INTRO', intro);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
