// main page storage for picking up the recent works
// @ts-check
/// <reference path="./work.types.d.ts" />

import api from '../api';

const getDefaultWork = () => ({
  title: '...',
  _id: '',
  caption: '',
  images: [],
  url: '',
  relatedStacks: [],
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const getWorkInitialState = () => ({
  works: [],
  currentWork: null,
  page: 1,
  totalPages: 1,
});

const workInitialState = getWorkInitialState();

/** @type {WorkTypes.WORK_ACTIONS} */
export const WORK_ACTIONS = {
  SET_WORK: 'SET_WORK',
  SET_WORKS: 'SET_WORKS',
  SET_PAGE: 'SET_PAGE',
  INIT: 'INIT',
};

// REDUCERS
export const workReducer = (state = workInitialState, action) => {
  switch (action.type) {
    case WORK_ACTIONS.SET_WORK:
      return {
        ...state,
        currentWork: action.payload,
      };
    case WORK_ACTIONS.SET_WORKS:
      return {
        ...state,
        ...action.payload,
      };
    case WORK_ACTIONS.SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case WORK_ACTIONS.INIT:
      return getWorkInitialState();
    default:
      return state;
  }
};

// ACTIONS
export const initWork = () => async (dispatch, getState) => {
  await dispatch({ type: WORK_ACTIONS.INIT });
};

export const getWorks = () => async (dispatch, getState) => {
  try {
    const { work } = getState();
    const worksData = await api('/info/works', 'get', {
      page: work.page,
      limit: 15,
      populate: true,
    });
    const works = worksData.docs;
    const { totalPages, page } = worksData;
    await dispatch({
      type: WORK_ACTIONS.SET_WORKS,
      payload: { works, totalPages, page },
    });
  } catch (err) {
    console.error(err);
  }
};

export const setPage = page => async (dispatch, getState) => {
  await dispatch({ type: WORK_ACTIONS.SET_PAGE, payload: page });
  await dispatch(getWorks());
};

export const openWork = workId => async (dispatch, getState) => {
  const targetWork = await api(`/info/works/${workId}`);
  if (targetWork)
    await dispatch({ type: WORK_ACTIONS.SET_WORK, payload: targetWork });
};

export const closeWork = () => async (dispatch, getState) => {
  await dispatch({ type: WORK_ACTIONS.SET_WORK, payload: null });
};

export const prevPage = () => async (dispatch, getState) => {
  const { work } = getState();
  if (work.page - 1 >= 1) await dispatch(setPage(work.page - 1));
};

export const nextPage = () => async (dispatch, getState) => {
  const { work } = getState();
  if (work.page < work.totalPages) await dispatch(setPage(work.page + 1));
};
