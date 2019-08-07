// import React from 'react';
import { connect } from 'react-redux';
import NextSeo from 'next-seo';

import { enhanceAll } from '../lib/util';
import '../styles/index.css';
import Menu from '../components/Menu';
import env from '../env-vars';

// import PropTypes from 'prop-types';

const SEOcontent = {
  title: 'Sungryeol.com',
  description: 'Park Sungryeol Portfolio',
  canonical: 'https://www.sungryeol.com/',
  openGraph: {
    url: 'https://www.sungryeol.com/',
    title: 'Park Sungryeol Portfolio',
    description: 'Work and Portfolio of Park Sungryeol',
  },
  images: [],
};

const WorkPage = props => {
  const { works } = props;

  return (
    <div>
      <NextSeo config={SEOcontent} />
      <Menu />
      <h1>works</h1>
    </div>
  );
};

WorkPage.getInitialProps = async ({ reduxStore, req }) => {
  const isServer = !!req;
  // await reduxStore.dispatch(getLatestPost());
  // await reduxStore.dispatch(getIntro());
  // await reduxStore.dispatch(getStacks());
  return { isServer };
};

// proptype is not necessary for page
// Index.propTypes = {
//   dispatch: PropTypes.func,
// }

const mapStateToProps = ({ info }) => ({ info });
const mapDispatchToProps = dispatch => ({
  // setStackKeyword: keyword => dispatch(setStackKeyword(keyword)),
});
const enhancers = [
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
];
const enhanced = enhanceAll(WorkPage, enhancers);
export default enhanced;
