import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';

import withReduxStore from '../lib/with-redux-store';
import { enhanceAll } from '../lib/util';

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

const enhancers = [withReduxStore];
const enhanced = enhanceAll(MyApp, enhancers);
export default enhanced;
