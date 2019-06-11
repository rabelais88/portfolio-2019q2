import axios from 'axios';
import _get from 'lodash/get';
// axios#request(config)
// axios#get(url[, config])
// axios#delete(url[, config])
// axios#head(url[, config])
// axios#options(url[, config])
// axios#post(url[, data[, config]])
// axios#put(url[, data[, config]])
// axios#patch(url[, data[, config]])
// axios#getUri([config])

const { API_URL } = process.env;

class api {
  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
    });
    this._resInterceptor = res => _get(res, 'data', null);
    this._errInterceptor = err => Promise.reject(err);
    this.setInterceptors();
    return this;
  }

  get resInterceptor() {
    return this._resInterceptor;
  }

  get errInterceptor() {
    return this._errInterceptor;
  }

  set resInterceptor(newInterceptor) {
    this._resInterceptor = newInterceptor;
    this.setInterceptors();
  }

  set errInterceptor(newInterceptor) {
    this._errInterceptor = newInterceptor;
    this.setInterceptors();
  }

  setInterceptors() {
    this.api.interceptors.response.use(
      this.resInterceptor,
      this.errInterceptor,
    );
  }

  onError(errInterceptor = err => Promise.reject(err)) {
    this.errInterceptor = errInterceptor;
    return this; // make it chainable
  }

  onResponse(resInterceptor = res => _get(res, 'data', null)) {
    this.resInterceptor = resInterceptor;
    return this;
  }

  setBasicAuth({ email, password }) {
    this.api = axios.create({
      baseURL: API_URL,
      auth: {
        username: email,
        password,
      },
    });
    this.setInterceptors();
    return this;
  }

  setToken(token) {
    this.api.defaults.headers.common.Authorization = `Bearer ${token}`;
    return this; // make it chainable
  }

  async tokenValidate() {
    const adminInfo = await this.api.get('/auth');
    return adminInfo;
  }

  async loginAdmin() {
    const adminInfo = await this.api.post('/auth');
    console.log('Api.js login admin result -', adminInfo);
    return adminInfo;
  }

  /**
   * get index page markdown info
   * @returns {String} markdown text
   */
  async getIntro() {
    const res = await this.api.get('/info/intro');
    return res;
  }

  async getStacks() {
    const res = await this.api.get('/info/stacks');
    return res;
  }

  // async setIntro(intro) {
  //   const res = await this.api.patch('/info/intro', { intro });
  //   return res;
  // }

  // async setStacks(stacks) {
  //   const res = await this.api.patch('/info/stacks', { stacks });
  //   return res;
  // }

  // async createPost(post) {
  //   const res = await this.api.post('/info/post', post);
  //   return res;
  // }

  async getPost(postId) {
    const res = await this.api.get(`/info/post/${postId}}`);
    return res;
  }

  async getPosts(opts) {
    const query = Object.entries(opts).map(([key, value]) => `&${key}=${value}`);
    const res = await this.api.get(`/info/posts?${query}`);
    return res;
  }
}

export default api;
