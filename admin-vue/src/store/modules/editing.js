import { getIntro, saveIntro, getPosts, createPost, getPost } from '@/api/editing';
import { Notification } from 'element-ui';
const SET_POST = 'SET_POST';
const SET_INTRO = 'SET_INTRO';
const SET_POSTS = 'SET_POST';
const ADD_POST = 'ADD_POST';
const SET_TOTAL_PAGES = 'SET_TOTAL_PAGES';
const SET_POST_PAGE = 'SET_POST_PAGE';

const state = {
  intro: '',
  stacks: [],
  posts: [],
  postPage: 1,
  postLimit: 10,
  postTotalPages: 1,
};

const mutations = {
  [SET_INTRO](state, payload) {
    state.intro = payload;
  },
  [SET_POSTS](state, payload) {
    state.posts = payload;
  },
  [SET_TOTAL_PAGES](state, payload) {
    state.postTotalPages = payload;
  },
  [SET_POST_PAGE](state, payload) {
    state.postPage = payload;
  },
  [ADD_POST](state, payload) {
    state.posts.push(payload);
  },
};

const actions = {
  async getIntro({ commit }) {
    const intro = await getIntro();
    commit(SET_INTRO, intro);
  },
  async saveIntro({ commit }, intro) {
    const res = await saveIntro(intro);
    if (res) Notification.success({ message: 'successfully updated intro' });
    commit(SET_INTRO, res);
  },
  async getPost({ state, commit }, postId) {
    const post = await getPost(postId);
    commit(SET_POST, post)
  },
  async getPosts({ state, commit }) {
    const optPagination = {
      limit: state.postLimit,
      page: state.postPage,
    };
    const posts = await getPosts(optPagination);
    commit(SET_POSTS, posts.docs);
    commit(SET_TOTAL_PAGES, posts.totalPages);
  },
  async createPost({ commit }, post) {
    const res = await createPost(post);
    if (res) Notification.success({ message: 'successfully made a new post' });
    commit(ADD_POST, res);
  },
  async setPostPage({ commit, dispatch }, page) {
    commit(SET_POST_PAGE, page);
    dispatch('getPosts');
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
