import Router from 'next/router';
import { Cookies } from 'react-cookie';
import _get from 'lodash/get';
import Api from './Api';
// set up cookies
const cookies = new Cookies();

export async function handleAuthSSR(ctx) {
  let token = null;

  // if context has request info aka Server Side
  if (ctx.req) {
    // ugly way to get cookie value from a string of values
    // good enough for demostration
    token = _get(ctx, 'req.headers.cookie', '').replace(
      /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
  } else {
    // we dont have request info aka Client Side
    token = cookies.get('token');
  }


  const api = new Api().setToken(token).onError(err => {
    cookies.remove('token');
    // in case of error
    console.log(err.response.data.msg);
    console.log('redirecting back to login page');
    // redirect to login
    if (ctx.res) {
      ctx.res.writeHead(302, {
        Location: '/login',
      });
      ctx.res.end();
    } else {
      Router.push('/login');
    }
  });
  const tokenValidation = await api.tokenValidate();
  console.log('handleAuthSSR - token check result', tokenValidation);
}
