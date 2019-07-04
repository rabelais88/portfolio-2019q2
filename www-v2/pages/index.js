// import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';

import { addCount, subCount, initCount } from '../store/count';
import { enhanceAll } from '../lib/util';
import '../styles/test.css';

// import PropTypes from 'prop-types';

const Index = props => {
  const { dispatch } = props;
  return (
    <div>
      <span className="example">{JSON.stringify(props)}</span>
      <button onClick={() => dispatch(addCount(1))}>add Count1</button>
      <button onClick={() => dispatch(addCount(2))}>add Count2</button>
      <button onClick={() => dispatch(initCount())}>init count</button>
      <button onClick={() => dispatch(subCount(1))}>subCount</button>
      <Link href="/page2">
        <a>page2</a>
      </Link>
    </div>
  );
};

Index.getInitialProps = ({ reduxStore, req }) => {
  const isServer = !!req;
  // reduxStore.dispatch(addCount(1));
  return { isServer };
};

// proptype is not necessary for page
// Index.propTypes = {
//   dispatch: PropTypes.func,
// }

const enhancers = [connect(state => state)];
const enhanced = enhanceAll(Index, enhancers);
export default enhanced;
