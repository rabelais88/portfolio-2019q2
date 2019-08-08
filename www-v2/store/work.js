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
        works: action.payload,
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
    const works = await api('/info/works', 'get', {
      page: work.page,
      limit: 15,
      populate: true,
    });
    await dispatch({ type: WORK_ACTIONS.SET_WORKS, payload: works });
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
