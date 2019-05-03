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
    return this;
  }

  onError(errInterceptor = err => Promise.reject(err)) {
    this.api.interceptors.response.use(
      res => _get(res, 'data', null),
      errInterceptor,
    );
    return this; // make it chainable
  }

  setToken(token) {
    this.api.defaults.headers.common.Authorization = token;
    return this; // make it chainable
  }

  /**
   * get index page markdown info
   * @returns {String} markdown text
   */
  async getIndex() {
    const res = await this.api.get('/info-index');
    return res.indexMarkdown;
  }

  /**
   * post login request and gets user info
   * @returns {Object} user data + token
   */
  postLogin({ email, password }) {
    return this.api.post('/auth', { email, password });
  }

  async getStacks() {
    const res = await this.api.get('/info-stacks');
    return res.stacks;
  }
}

export default api;
