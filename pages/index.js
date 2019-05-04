import Helmet from 'react-helmet';
import Fade from 'react-reveal/Fade';
// https://www.react-reveal.com/examples/common/fade/
import { toast } from "react-toastify";
import ReactMarkdown from 'react-markdown';

import Menu from '../components/menu';
import './index.scss';

const Home = props => {
  const { indexMarkdown } = props;
  return (
    <div>
      <Helmet
        title="Park Sungryeol - portfolio"
        meta={[{ property: 'og:title', content: 'Index' }]}
      />
      <Menu />
      <Fade left className="titlebox">
        <div>
          <h1>Park Sungryeol</h1>
          <h2>박_성렬</h2>
          <h3>work and portfolio</h3>
        </div>
      </Fade>
      <ReactMarkdown source={indexMarkdown} />
      <button onClick={() => toast.success('show me toast!')}>show me toast</button>
    </div>
  );
};

Home.getInitialProps = async props => {
  const { req, res, err, pathname, query, asPath } = props;
  if (req) { // server side 
    return { indexMarkdown: req.dataIndex };
  }
  // const res = await fetch('https://api.github.com/repos/zeit/next.js');
  // const json = await res.json();
  // return { stars: json.stargazers_count };
  // console.log(props);
  return [];
};

export default Home;
