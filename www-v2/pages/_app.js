import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import withReduxStore from '../lib/with-redux-store';
import { enhanceAll } from '../lib/util';

class MyApp extends App {
  constructor(props) {
    super(props);
    this.persistor = persistStore(props.reduxStore); // redux-persist
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Provider store={reduxStore}>
          <PersistGate
            loading={<Component {...pageProps} />}
            persistor={this.persistor}
          >
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      </Container>
    );
  }
}

const enhancers = [withReduxStore];
const enhanced = enhanceAll(MyApp, enhancers);
export default enhanced;
