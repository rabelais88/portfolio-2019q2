// import React from 'react';
import { connect } from 'react-redux';
import { addCount, subCount } from '../store/count';
import { enhanceAll } from '../lib/util';
import Menu from '../components/Menu';

const Index = props => {
  const { dispatch } = props;
  return (
    <div>
      <span>{JSON.stringify(props)}</span>
      <button onClick={() => dispatch(addCount(1))}>add Count1</button>
      <button onClick={() => dispatch(addCount(2))}>add Count2</button>
      <Menu />
    </div>
  );
};

Index.getInitialProps = ({ reduxStore, req }) => {
  const isServer = !!req;
  // reduxStore.dispatch(addCount(1));
  return { isServer };
};

const enhancers = [connect(state => state)];
const enhanced = enhanceAll(Index, enhancers);
export default enhanced;
