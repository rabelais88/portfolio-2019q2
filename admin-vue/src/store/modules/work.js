import {
  getWorks,
  createWork,
  getWork,
  modifyWork,
  deleteWork,
} from '@/api/work';

import { Notification } from 'element-ui';

import _pick from 'lodash/pick';

export const WORK_MUTATIONS = {
  SET_CURRENT_WORK: 'SET_CURRENT_WORK',
  SET_WORKS: 'SET_WORKS',
  // ADD_WORK: 'ADD_WORK',
  SET_TOTAL_PAGES: 'SET_TOTAL_PAGES',
  SET_PAGE: 'SET_PAGE',
  SET_SORT: 'SET_SORT',
  SET_SEARCH: 'SET_SEARCH',
};

const state = {
  works: [],
  page: 1,
  limit: 1,
  totalPages: 1,
  sortDirection: 'asc',
  sortField: null,
  searchKeyword: '',
  currentWork: {},
};

const mutations = {
  [WORK_MUTATIONS.SET_CURRENT_WORK](state, payload) {
    state.currentWork = payload;
  },
  [WORK_MUTATIONS.SET_WORKS](state, payload) {
    state.works = payload;
  },
  [WORK_MUTATIONS.SET_TOTAL_PAGES](state, payload) {
    state.totalPages = payload;
  },
  // [WORK_MUTATIONS.ADD_WORK]()
  [WORK_MUTATIONS.SET_PAGE](state, payload) {
    state.page = payload;
  },
  [WORK_MUTATIONS.SET_SORT](state, { prop, order }) {
    state.sortDirection = order;
    state.sortField = prop;
  },
  [WORK_MUTATIONS.SET_SEARCH](state, payload) {
    state.searchKeyword = payload;
  },
};

const actions = {
  async getWorks({ state, commit }) {
    const optPagination = {
      limit: state.limit,
      page: state.page,
    };
    if (state.sortField) optPagination.sortField = state.sortField;
    if (state.sortDirection) optPagination.sortDirection = state.sortDirection;
    if (state.searchKeyword !== '') optPagination.title = state.searchKeyword;
    const works = await getWorks(optPagination);
    commit(WORK_MUTATIONS.SET_WORKS, works.docs);
    commit(WORK_MUTATIONS.SET_TOTAL_PAGES, works.totalPages);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
