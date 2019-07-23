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

export const getPosts = queries => {
  const query = Object.entries(queries)
    .map(q => `${q[0]}=${q[1]}`)
    .join('&');
  return request({
    url: `/info/posts?${query}`,
    method: 'get',
  });
};

export const createPost = post =>
  request({
    url: '/info/post',
    method: 'post',
    data: post,
  });

export const getPost = postId =>
  request({
    url: `/info/post/${postId}`,
    method: 'get',
  });

export const modifyPost = post =>
  request({
    url: `info/post`,
    method: 'patch',
    data: post,
  });

export const deletePost = postId =>
  request({
    url: `info/post/${postId}`,
    method: 'delete',
  });

export const getStacks = () =>
  request({
    url: 'info/stacks',
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

export const getWorks = queries => {
  const query = Object.entries(queries)
    .map(q => `${q[0]}=${q[1]}`)
    .join('&');
  return request({
    url: `/info/works?${query}`,
    method: 'get',
  });
};

export const createWork = newWork =>
  request({
    url: '/info/work',
    method: 'work',
    data: newWork,
  });

export const getWork = workId =>
  request({
    url: `/info/work/${workId}`,
    method: 'get',
  });

export const modifyWork = work =>
  request({
    url: `info/work`,
    method: 'patch',
    data: work,
  });

export const deleteWork = workId =>
  request({
    url: `info/work/${workId}`,
    method: 'delete',
  });
