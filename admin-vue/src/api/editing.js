import request from '@/utils/request';

export const getIntro = () =>
  request({
    url: '/info/intro',
    method: 'get',
  });

export const saveIntro = intro =>
  request({
    url: '/info/intro',
    method: 'patch',
    data: { intro },
  });

export const getStacks = searchKeyword =>
  request({
    url: `info/stacks${searchKeyword && searchKeyword !== '' ? `?search=${searchKeyword}` : ''}`,
    method: 'get',
  });

export const createStack = stack =>
  request({
    url: 'info/stack',
    method: 'post',
    data: stack,
  });

export const modifyStack = stack =>
  request({
    url: 'info/stack',
    method: 'patch',
    data: stack,
  });

export const deleteStack = stackId =>
  request({ url: `info/stack/${stackId}`, method: 'delete' });

