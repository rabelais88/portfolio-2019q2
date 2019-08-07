// import React from 'react';
import { connect } from 'react-redux';
import NextSeo from 'next-seo';

import { enhanceAll } from '../lib/util';
import '../styles/work.css';
import Menu from '../components/Menu';
import env from '../env-vars';
import {
  initWork,
  getWorks,
  setPage,
  viewWork,
  closeWork,
} from '../store/work';

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
  const { work } = props;
  // prop.initWOrk();
  return (
    <div className="page-work">
      <NextSeo config={SEOcontent} />
      <Menu />
      <h1 className="work--title-main">WORKS</h1>
      <p className="work--title-sub">&amp; CASE STUDY</p>
      <p>{JSON.stringify(work)}</p>
    </div>
  );
};

WorkPage.getInitialProps = async ({ reduxStore, req }) => {
  const isServer = !!req;
  await reduxStore.dispatch(getWorks());
  return { isServer };
};

// proptype is not necessary for page
// Index.propTypes = {
//   dispatch: PropTypes.func,
// }

const mapStateToProps = ({ work }) => ({ work });
const mapDispatchToProps = dispatch => ({
  initWork: () => dispatch(initWork()),
  getWorks: () => dispatch(getWorks()),
  setPage: page => dispatch(setPage(page)),
  viewWork: workId => dispatch(viewWork(workId)),
  closeWork: () => dispatch(closeWork()),
});
const enhancers = [
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
];
const enhanced = enhanceAll(WorkPage, enhancers);
export default enhanced;
