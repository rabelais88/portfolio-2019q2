import React from 'react';
import App, { Container } from 'next/app';
import Helmet from 'react-helmet';
import { PageTransition } from 'next-page-transitions';
import Router from 'next/router';
import NProgress from 'nprogress';
import stylePageTransition from '../styles/page-transition.scss';

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

Router.events.on('routeChangeStart', url => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
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
        <PageTransition timeout={300} classNames="page-transition">
          <Component {...pageProps} />
        </PageTransition>
      </Container>
    );
  }
}
