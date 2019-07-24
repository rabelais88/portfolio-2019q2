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
  SET_TOTAL_PAGES: 'SET_TOTAL_PAGES',
  SET_PAGE: 'SET_PAGE',
  SET_SORT: 'SET_SORT',
  SET_SEARCH_KEYWORD: 'SET_SEARCH_KEYWORD',
  // ADD_WORK: 'ADD_WORK',
};

export const WORK_ACTIONS = {
  getWorks: 'getWorks',
  getWork: ' getWork',
  setPage: 'setPage',
  createWork: 'createWork',
  setSort: 'setSort',
  deleteWorks: 'deleteWorks',
  modifyWork: 'modifyWork',
};

export const getEmptyWork = () => ({
  title: '',
  caption: '',
  url: '',
  images: [],
  relatedStacks: []
});

const state = {
  works: [],
  page: 1,
  limit: 10,
  totalPages: 1,
  sortDirection: 'asc',
  sortField: null,
  searchKeyword: '',
  currentWork: getEmptyWork(),
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
  [WORK_MUTATIONS.SET_PAGE](state, payload) {
    state.page = payload;
  },
  [WORK_MUTATIONS.SET_SORT](state, { prop, order }) {
    state.sortDirection = order;
    state.sortField = prop;
  },
  [WORK_MUTATIONS.SET_SEARCH_KEYWORD](state, payload) {
    state.searchKeyword = payload;
  },
  // [WORK_MUTATIONS.ADD_WORK]()
};

const actions = {
  async [WORK_ACTIONS.getWorks]({ state, commit }) {
    const optPagination = {
      limit: state.limit,
      page: state.page,
    };
    if (state.sortField) {
      optPagination.sortField = state.sortField;
      optPagination.sortDirection = state.sortDirection;
    }
    if (state.searchKeyword !== '') optPagination.title = state.searchKeyword;
    const works = await getWorks(optPagination);
    commit(WORK_MUTATIONS.SET_WORKS, works.docs);
    commit(WORK_MUTATIONS.SET_TOTAL_PAGES, works.totalPages);
  },
  async [WORK_ACTIONS.getWork]({ commit }, workId) {
    const work = await getWork(workId);
    commit(WORK_MUTATIONS.SET_CURRENT_WORK, work);
  },
  async [WORK_ACTIONS.setPage]({ commit, dispatch }, page) {
    commit(WORK_MUTATIONS.SET_PAGE, page);
    await dispatch(WORK_ACTIONS.getWorks);
  },
  async [WORK_ACTIONS.createWork]({ dispatch }, work) {
    const res = await createWork(work);
    if (res)
      Notification.success({ message: 'successfully posted a new work' });
    await dispatch(WORK_ACTIONS.getWorks);
  },
  async [WORK_ACTIONS.setSort]({ commit, dispatch }, { prop, order }) {
    commit(WORK_MUTATIONS.SET_SORT, { prop, order });
    await dispatch(WORK_ACTIONS.getWorks);
  },
  async [WORK_ACTIONS.deleteWorks]({ dispatch }, workIds) {
    const deletions = workIds.map(workId => deleteWork(workId));
    await Promise.all(deletions);
    await dispatch(WORK_ACTIONS.getWorks);
  },
  async [WORK_ACTIONS.modifyWork]({ commit }, work) {
    const newWork = _pick(work, [
      '_id',
      'title',
      'caption',
      'url',
      'images',
      'relatedStacks',
    ]);
    const res = await modifyWork(newWork);
    return res;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
