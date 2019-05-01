import './index.scss';
import Helmet from 'react-helmet';
import Menu from '../components/menu';

const Home = () => {
  return (
    <div>
      <Helmet
        title="Park Sungryeol - portfolio"
        meta={[{ property: 'og:title', content: 'Index' }]}
      />
      <Menu />
      <div className="titlebox">
        <h1>Park Sungryeol</h1>
        <h2>박_성렬</h2>
        <h3>work and portfolio</h3>
      </div>
    </div>
  );
};

Home.getInitialProps = async props => {
  const { req, res, err, pathname, query, asPath } = props;
  // const res = await fetch('https://api.github.com/repos/zeit/next.js');
  // const json = await res.json();
  // return { stars: json.stargazers_count };
  // console.log(props);
  return [];
};

export default Home;
