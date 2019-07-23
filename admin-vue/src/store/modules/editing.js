import {
  getIntro,
  saveIntro,
  getStacks,
  createStack,
  deleteStack,
  modifyStack,
} from '@/api/editing';
import { Notification } from 'element-ui';
import Vue from 'vue';

const EDITING_MUTATIONS = {
  SET_INTRO: 'SET_INTRO',
  SET_STACKS: 'SET_STACKS',
  SET_STACK: 'SET_STACK',
  SET_NEW_STACK: 'SET_NEW_STACK',
  SET_EDITING_STACK: 'SET_EDITING_STACK',
};

const getNewStack = () => ({
  name: '',
  desc: '',
  icon: '',
});

const state = {
  intro: '',
  stacks: [],
  newStack: getNewStack(),
  editingStack: false,
};

const mutations = {
  [EDITING_MUTATIONS.SET_INTRO](state, payload) {
    state.intro = payload;
  },
  [EDITING_MUTATIONS.SET_STACKS](state, payload) {
    state.stacks = payload;
  },
  [EDITING_MUTATIONS.SET_STACK](state, stack) {
    const idx = state.stacks.findIndex(s => s._id === stack._id);
    Vue.set(state.stacks, idx, stack);
  },
  [EDITING_MUTATIONS.SET_NEW_STACK](state, payload) {
    state.newStack = payload;
  },
  [EDITING_MUTATIONS.SET_EDITING_STACK](state, payload) {
    state.editingStack = payload;
  },
};

const actions = {
  async getIntro({ commit }) {
    const intro = await getIntro();
    commit(EDITING_MUTATIONS.SET_INTRO, intro);
  },
  async saveIntro({ commit }, intro) {
    const res = await saveIntro(intro);
    if (res) Notification.success({ message: 'successfully updated intro' });
    commit(EDITING_MUTATIONS.SET_INTRO, res);
  },
  async getStacks({ commit }) {
    const stacks = await getStacks();
    commit(EDITING_MUTATIONS.SET_STACKS, stacks);
  },
  openStack({ commit }, stackId) {
    const newStack = state.stacks.find(s => s._id === stackId);
    commit(EDITING_MUTATIONS.SET_NEW_STACK, newStack);
    commit(EDITING_MUTATIONS.SET_EDITING_STACK, true);
  },
  openNewStack({ commit }) {
    commit(EDITING_MUTATIONS.SET_NEW_STACK, getNewStack());
    commit(EDITING_MUTATIONS.SET_EDITING_STACK, true);
  },
  editStackByKey({ state, commit }, obj) {
    const newStack = Object.assign(state.newStack, obj);
    commit(EDITING_MUTATIONS.SET_NEW_STACK, newStack);
  },
  async createStack({ commit, state, dispatch }, fileurl) {
    const newStack = Object.assign(state.newStack, { icon: fileurl });
    console.log('new stack', newStack);
    await createStack(newStack);
    await dispatch('getStacks');
    commit(EDITING_MUTATIONS.SET_EDITING_STACK, false);
  },
  async deleteStacks({ dispatch }, stackIds) {
    const deletions = stackIds.map(stackId => deleteStack(stackId));
    await Promise.all(deletions);
    await dispatch('getStacks');
  },
  async modifyStack({ commit, state, dispatch }, fileurl) {
    const newStack = Object.assign(state.newStack, { icon: fileurl });
    await modifyStack(newStack);
    await dispatch('getStacks');
    commit(EDITING_MUTATIONS.SET_EDITING_STACK, false);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
