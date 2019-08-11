// import React from 'react';
import { connect } from 'react-redux';
import NextSeo from 'next-seo';

import { enhanceAll } from '../lib/util';
import '../styles/post.css';
import Menu from '../components/Menu';
import env from '../env-vars';
import {
  getPosts,
  setPage,
  openPost,
  closePost,
  nextPage,
  prevPage,
} from '../store/post';

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

const PostPage = props => {
  const { post } = props;
  const onPrev = e => {
    e.preventDefault();
    props.prevPage();
  };
  const onNext = e => {
    e.preventDefault();
    props.nextPage();
  };

  return (
    <div className="page-post">
      <NextSeo config={SEOcontent} />
      <Menu />
      <h1 className="post--title1">Post.</h1>
      <p className="post--title2">opinions and thoughts</p>
      <hr className="post--title-line" />
      <h1 className="post--title-most-pop">most popular</h1>
      <p className="post--content-most-pop">this is most popular writing</p>
      <div className="searchbox post--searchbox">
        <img src="/static/images/icon-magnifying-glass.svg" alt="search icon" />
        <input type="text" />
      </div>
      <ul className="post--list">
        {post.posts.length >= 1 &&
          post.posts.map(postData => {
            return <li key={postData._id}>{postData.title}</li>;
          })}
      </ul>
      <div className="post--pagination">
        <a href="#" onClick={onPrev}>
          prev
        </a>
        <p>{post.page}</p>
        <a href="#" onClick={onNext}>
          next
        </a>
      </div>
    </div>
  );
};

PostPage.getInitialProps = async ({ reduxStore, req }) => {
  const isServer = !!req;
  await reduxStore.dispatch(getPosts());
  return { isServer };
};

// proptype is not necessary for page
// Index.propTypes = {
//   dispatch: PropTypes.func,
// }

const mapStateToProps = ({ post }) => ({ post });
const mapDispatchToProps = dispatch => ({
  setPage: page => dispatch(setPage(page)),
  getPosts: () => dispatch(getPosts()),
  openPost: postId => dispatch(openPost(postId)),
  closePost: () => dispatch(closePost()),
  nextPage: () => dispatch(nextPage()),
  prevPage: () => dispatch(prevPage()),
});
const enhancers = [
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
];
const enhanced = enhanceAll(PostPage, enhancers);
export default enhanced;
