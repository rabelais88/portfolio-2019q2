// import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import NextSeo from 'next-seo';

import { addCount, subCount, initCount } from '../store/count';
import { enhanceAll } from '../lib/util';
// import '../styles/test.css';
import '../styles/common.css';
import Menu from '../components/Menu';
import { getLatestPost } from '../store/post';
import { getIntro } from '../store/info';

// import PropTypes from 'prop-types';

const SEOcontent = {
  title: 'Page Meta Title',
  description: 'This will be the page meta description',
  canonical: 'https://www.canonicalurl.ie/',
  openGraph: {
    url: 'https://www.canonicalurl.ie/',
    title: 'Open Graph Title',
    description: 'Open Graph Description',
    images: [
      {
        url: 'https://www.example.ie/og-image-01.jpg',
        width: 800,
        height: 600,
        alt: 'Og Image Alt',
      },
      {
        url: 'https://www.example.ie/og-image-02.jpg',
        width: 900,
        height: 800,
        alt: 'Og Image Alt Second',
      },
      { url: 'https://www.example.ie/og-image-03.jpg' },
      { url: 'https://www.example.ie/og-image-04.jpg' },
    ],
  },
};

const Index = props => {
  const { dispatch } = props;
  return (
    <div>
      <NextSeo config={SEOcontent} />
      <span className="example">{JSON.stringify(props)}</span>
      <button onClick={() => dispatch(addCount(1))}>add Count1</button>
      <button onClick={() => dispatch(addCount(2))}>add Count2</button>
      <button onClick={() => dispatch(initCount())}>init count</button>
      <button onClick={() => dispatch(subCount(1))}>subCount</button>
      <Menu />
    </div>
  );
};

Index.getInitialProps = async ({ reduxStore, req }) => {
  const isServer = !!req;
  await reduxStore.dispatch(getLatestPost());
  await reduxStore.dispatch(getIntro());
  return { isServer };
};

// proptype is not necessary for page
// Index.propTypes = {
//   dispatch: PropTypes.func,
// }

const enhancers = [connect(state => state)];
const enhanced = enhanceAll(Index, enhancers);
export default enhanced;
