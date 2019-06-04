import request from '@/utils/request';

export const getIntro = () => request({
  url: '/info/intro',
  method: 'get',
});

export const saveIntro = intro => request({
  url: '/info/intro',
  method: 'patch',
  data: { intro },
});

export const getPosts = ({limit, page}) => request({
  url: `/info/posts?limit=${limit}&page=${page}`,
  method: 'get',
});

export const createPost = post => request({
  url: '/info/post',
  method: 'post',
  data: post,
});
