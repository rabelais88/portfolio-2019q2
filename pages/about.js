import styleTest from '../styles/test.scss';
import Helmet from 'react-helmet';
import Menu from '../components/menu';
const About = () => {
  return (
  <div className="example">
    <Helmet
      title='About | Hello next.js!'
      meta={[{ property: 'og:title', content: 'About' }]}
    />
    <Menu />
    This is about page;
  </div>);
};

About.getInitialProps = async props => {
  const { req, res, err, pathname, query, asPath } = props;
  // const res = await fetch('https://api.github.com/repos/zeit/next.js');
  // const json = await res.json();
  // return { stars: json.stargazers_count };
  // console.log(props);
  return [];
};

export default About;