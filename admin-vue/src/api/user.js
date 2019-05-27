import request from '@/utils/request'

export function login({ username, password }) {
  return request({
    url: '/auth',
    method: 'post',
    auth: {
      username,
      password
    },
    withCredentials: false
  })
}

export function getInfo(token) {
  return request({
    url: '/auth',
    method: 'get',
    // headers: {
    //   Authorization: `Bearer ${token}`
    // },
    // withCredentials: false
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
