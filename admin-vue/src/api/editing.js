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
