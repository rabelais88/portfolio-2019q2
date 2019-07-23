import {
  getPosts,
  createPost,
  modifyPost,
  deletePost,
  getPost,
} from '@/api/post';

import { Notification } from 'element-ui';

import _pick from 'lodash/pick';

export const POST_MUTATIONS = {
  SET_POST: 'SET_POST',
  SET_POSTS: 'SET_POSTS',
  ADD_POST: 'ADD_POST',
  SET_TOTAL_PAGES: 'SET_TOTAL_PAGES',
  SET_POST_PAGE: 'SET_POST_PAGE',
  SET_SORT: 'SET_SORT',
  SET_POST_SEARCH: 'SET_POST_SEARCH',
};

const state = {
  posts: [],
  postPage: 1,
  postLimit: 10,
  postTotalPages: 1,
  postSortDirection: 'asc',
  postSortField: null,
  postSearch: '',
  currentPost: {},
};

const mutations = {
  [POST_MUTATIONS.SET_POST](state, payload) {
    state.currentPost = payload;
  },
  [POST_MUTATIONS.SET_POSTS](state, payload) {
    state.posts = payload;
  },
  [POST_MUTATIONS.SET_TOTAL_PAGES](state, payload) {
    state.postTotalPages = payload;
  },
  [POST_MUTATIONS.SET_POST_PAGE](state, payload) {
    state.postPage = payload;
  },
  [POST_MUTATIONS.ADD_POST](state, payload) {
    state.posts.push(payload);
  },
  [POST_MUTATIONS.SET_SORT](state, { prop, order }) {
    state.postSortDirection = order;
    state.postSortField = prop;
  },
  [POST_MUTATIONS.SET_POST_SEARCH](state, payload) {
    state.postSearch = payload;
  },
};

const actions = {
  async getPost({ commit }, postId) {
    const post = await getPost(postId);
    commit(POST_MUTATIONS.SET_POST, post);
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
    commit(POST_MUTATIONS.SET_POSTS, posts.docs);
    commit(POST_MUTATIONS.SET_TOTAL_PAGES, posts.totalPages);
  },
  async createPost({ commit }, post) {
    const res = await createPost(post);
    if (res) Notification.success({ message: 'successfully made a new post' });
    commit(POST_MUTATIONS.ADD_POST, res);
  },
  async modifyPost({ commit }, post) {
    const newPost = _pick(post, ['_id', 'title', 'content', 'images']);
    const res = await modifyPost(newPost);
    return res;
  },
  async setPostPage({ commit, dispatch }, page) {
    commit(POST_MUTATIONS.SET_POST_PAGE, page);
    await dispatch('getPosts');
  },
  async deletePosts({ dispatch }, postIds) {
    const deletions = postIds.map(postId => deletePost(postId));
    await Promise.all(deletions);
    await dispatch('getPosts');
  },
  async setSort({ commit, dispatch }, { prop, order }) {
    commit(POST_MUTATIONS.SET_SORT, { prop, order });
    await dispatch('getPosts');
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
