import request from '@/utils/request';

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
