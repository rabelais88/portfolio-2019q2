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

export const getPosts = (queries) => {
  const query = Object.entries(queries).map(q => `${q[0]}=${q[1]}`).join('&');
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
