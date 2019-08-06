// import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import NextSeo from 'next-seo';

import { addCount, subCount, initCount } from '../store/count';
import { enhanceAll } from '../lib/util';
import '../styles/index.css';
import Menu from '../components/Menu';
import { getLatestPost } from '../store/post';
import { getIntro, setStackKeyword, getStacks } from '../store/info';
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

const curatedTags = ['frontend', 'backend'];

const TitleBox = () => (
  <div className="titlebox">
    <h1>박성렬</h1>
    <span>포트폴리오</span>
    <h2>Sungryeol</h2>
    <hr />
    <h3>blog &amp; portfolio</h3>
  </div>
);

const StackItem = props => {
  const { name, desc, icon } = props;
  return (
    <li className="stack">
      {icon && <img src={`${env.IMAGE_HOST}/${icon}`} alt={name} />}
      <h3>{name || 'unknown skill'}</h3>
      <p>{desc}</p>
    </li>
  );
};

const Index = props => {
  const { info } = props;

  const onTagClicked = (ev, tag) => {
    ev.preventDefault();
    props.setStackKeyword(tag);
  };

  return (
    <div>
      <NextSeo config={SEOcontent} />
      <Menu />
      <TitleBox />
      <figure className="pic-birds">
        <img
          src="/static/images/pic-birdsandflowers.png"
          alt="birds and flowers, korean painting"
        />
        <figcaption>
          Birds and Flowers, late 19th–early 20th century Unidentified Artist,
          Korea
        </figcaption>
      </figure>
      {/* <button onClick={() => dispatch(addCount(1))}>add Count1</button>
      <button onClick={() => dispatch(addCount(2))}>add Count2</button>
      <button onClick={() => dispatch(initCount())}>init count</button>
      <button onClick={() => dispatch(subCount(1))}>subCount</button> */}

      <figure className="pic-chaekgeori">
        <img
          src="/static/images/pic-chaekgeori.png"
          alt="chaekgeori, korean painting"
        />
        <figcaption>
          Chaekgeori - Books and Scholars, late 19th century Unidentified
          Artist, Korea
        </figcaption>
      </figure>
      <main>
        {info && <article>{info.intro}</article>}
        <h2 id="title2">and here&apos;s what I have learned</h2>
        <div id="stacksearch">
          <img
            src="/static/images/icon-magnifying-glass.svg"
            alt="search icon"
          />
          <input
            type="text"
            value={info.stackKeyword}
            onChange={ev => props.setStackKeyword(ev.target.value)}
            placeholder="type in to search"
          />
        </div>
        <ul className="stack-tags">
          {curatedTags.map(tag => (
            <a href="#" onClick={ev => onTagClicked(ev, tag)}>
              {tag}
            </a>
          ))}
        </ul>
        <ul className="stacks">
          {info.stacks &&
            info.stacks.map(stack => <StackItem {...stack} key={stack._id} />)}
        </ul>
      </main>
    </div>
  );
};

Index.getInitialProps = async ({ reduxStore, req }) => {
  const isServer = !!req;
  await reduxStore.dispatch(getLatestPost());
  await reduxStore.dispatch(getIntro());
  await reduxStore.dispatch(getStacks());
  return { isServer };
};

// proptype is not necessary for page
// Index.propTypes = {
//   dispatch: PropTypes.func,
// }

const mapStateToProps = ({ info }) => ({ info });
const mapDispatchToProps = dispatch => ({
  setStackKeyword: keyword => dispatch(setStackKeyword(keyword)),
});
const enhancers = [
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
];
const enhanced = enhanceAll(Index, enhancers);
export default enhanced;
