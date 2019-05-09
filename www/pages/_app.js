import React, { Children } from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import Router, { withRouter } from 'next/router';
import Helmet from 'react-helmet';
import { PageTransition } from 'next-page-transitions';
import NProgress from 'nprogress';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Cookies } from 'react-cookie';

import withReduxStore from '../reducers/with-redux-store';
import '../styles/anim.scss';
import '../styles/common.scss';
import { setUser } from '../actions/user';

// https://www.npmjs.com/package/next-page-transitions
/* <PageTransition
  timeout={300}
  classNames="page-transition"
  loadingComponent={<Loader />}
  loadingDelay={500}
  loadingTimeout={{
    enter: 400,
    exit: 0,
  }}
  loadingClassNames="loading-indicator"
>
  <Component {...pageProps} key={router.route} />
</PageTransition> */

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', url => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const cookies = new Cookies();

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, reduxStore, router } = this.props;
    const token = cookies.get('token');
    if (token) reduxStore.dispatch(setUser({ ...reduxStore.user, token }));
    console.log('current page:', Component.name);

    return (
      <Container>

        <Provider store={reduxStore}>
          <Helmet
            htmlAttributes={{ lang: 'en' }}
            title="Hello next.js!"
            meta={[
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
              { property: 'og:title', content: 'Hello next.js!' },
            ]}
          />
          <ToastContainer autoClose={3000} />
          <PageTransition timeout={300} classNames="page-transition">
            <Component {...pageProps} key={router.route} />
          </PageTransition>
        </Provider>
      </Container>
    );
  }
}

export default withRouter(withReduxStore(MyApp));