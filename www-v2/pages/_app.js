import App, { Container } from 'next/app';
import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { PageTransition } from 'next-page-transitions';
import NProgress from 'nprogress';
import Router from 'next/router';
import NextSeo from 'next-seo';

import withReduxStore from '../lib/with-redux-store';
import { enhanceAll } from '../lib/util';
import { wrapAll } from '../lib/render-util';
import SEOConfig from '../next-seo.config';
// import Loader from '../components/Loader';
// import '../styles/loader.css';
import '../styles/page-anim.css';

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', url => {
  console.log(`loading: ${url}}`);
  NProgress.start();
});

Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const PAGE_TRANSITION_TIMEOUT = 400;

class MyApp extends App {
  constructor(props) {
    super(props);
    this.persistor = persistStore(props.reduxStore); // redux-persist
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    const wrappers = [
      [
        PersistGate,
        { loading: <Component {...pageProps} />, persistor: this.persistor },
      ],
      [Provider, { store: reduxStore }],
      [Container],
      [
        PageTransition,
        {
          timeout: PAGE_TRANSITION_TIMEOUT,
          classNames: 'page-transition',
          // loadingComponent: <Loader />,
          // loadingDelay: 500,
          // loadingTimeout: { enter: PAGE_TRANSITION_TIMEOUT, exit: 0 },
          // loadingClassNames: 'loading-indicator',
        },
      ],
    ];
    return wrapAll(
      wrappers,
      <Fragment>
        <NextSeo config={SEOConfig} />
        <Component {...pageProps} />
      </Fragment>,
    );
    // return (
    //   <Container>
    //     <Provider store={reduxStore}>
    //       <PersistGate
    //         loading={<Component {...pageProps} />}
    //         persistor={this.persistor}
    //       >
    //         <Component {...pageProps} />
    //       </PersistGate>
    //     </Provider>
    //   </Container>
    // );
  }
}

const enhancers = [withReduxStore];
const enhanced = enhanceAll(MyApp, enhancers);
export default enhanced;
