import {
  getIntro,
  saveIntro,
  getPosts,
  createPost,
  modifyPost,
  deletePost,
  getPost,
  getStacks,
  createStack,
  deleteStack,
  modifyStack,
} from '@/api/editing';
import { Notification } from 'element-ui';
import Vue from 'vue';

const EDITING_MUTATIONS = {
  SET_POST: 'SET_POST',
  SET_INTRO: 'SET_INTRO',
  SET_POSTS: 'SET_POSTS',
  ADD_POST: 'ADD_POST',
  SET_TOTAL_PAGES: 'SET_TOTAL_PAGES',
  SET_POST_PAGE: 'SET_POST_PAGE',
  SET_SORT: 'SET_SORT',
  SET_POST_SEARCH: 'SET_POST_SEARCH',
  SET_STACKS: 'SET_STACKS',
  SET_STACK: 'SET_STACK',
  SET_NEW_STACK: 'SET_NEW_STACK',
  SET_EDITING_STACK: 'SET_EDITING_STACK',
};

import _pick from 'lodash/pick';

const getNewStack = () => ({
  name: '',
  desc: '',
  icon: '',
});

const state = {
  intro: '',
  stacks: [],
  posts: [],
  postPage: 1,
  postLimit: 10,
  postTotalPages: 1,
  postSortDirection: 'asc',
  postSortField: null,
  postSearch: '',
  currentPost: {},
  newStack: getNewStack(),
  editingStack: false,
};

const mutations = {
  [EDITING_MUTATIONS.SET_INTRO](state, payload) {
    state.intro = payload;
  },
  [EDITING_MUTATIONS.SET_POST](state, payload) {
    state.currentPost = payload;
  },
  [EDITING_MUTATIONS.SET_POSTS](state, payload) {
    state.posts = payload;
  },
  [EDITING_MUTATIONS.SET_TOTAL_PAGES](state, payload) {
    state.postTotalPages = payload;
  },
  [EDITING_MUTATIONS.SET_POST_PAGE](state, payload) {
    state.postPage = payload;
  },
  [EDITING_MUTATIONS.ADD_POST](state, payload) {
    state.posts.push(payload);
  },
  [EDITING_MUTATIONS.SET_SORT](state, { prop, order }) {
    state.postSortDirection = order;
    state.postSortField = prop;
  },
  [EDITING_MUTATIONS.SET_POST_SEARCH](state, payload) {
    state.postSearch = payload;
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
  async getPost({ commit }, postId) {
    const post = await getPost(postId);
    commit(EDITING_MUTATIONS.SET_POST, post);
  },
  async getPosts({ state, commit }) {
    const optPagination = {
      limit: state.postLimit,
      page: state.postPage,
    };
    if (state.postSortField) {
      optPagination.sortfield = state.postSortField;
      optPagination.sortdirection = state.postSortDirection;
    }
    if (state.postSearch !== '') optPagination.title = state.postSearch;
    const posts = await getPosts(optPagination);
    commit(EDITING_MUTATIONS.SET_POSTS, posts.docs);
    commit(EDITING_MUTATIONS.SET_TOTAL_PAGES, posts.totalPages);
  },
  async createPost({ commit }, post) {
    const res = await createPost(post);
    if (res) Notification.success({ message: 'successfully made a new post' });
    commit(EDITING_MUTATIONS.ADD_POST, res);
  },
  async modifyPost({ commit }, post) {
    const newPost = _pick(post, ['_id', 'title', 'content', 'images']);
    const res = await modifyPost(newPost);
    return res;
  },
  async setPostPage({ commit, dispatch }, page) {
    commit(EDITING_MUTATIONS.SET_POST_PAGE, page);
    await dispatch('getPosts');
  },
  async deletePosts({ dispatch }, postIds) {
    const deletions = postIds.map(postId => deletePost(postId));
    await Promise.all(deletions);
    await dispatch('getPosts');
  },
  async setSort({ commit, dispatch }, { prop, order }) {
    commit(EDITING_MUTATIONS.SET_SORT, { prop, order });
    await dispatch('getPosts');
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
