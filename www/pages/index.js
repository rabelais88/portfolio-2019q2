import Helmet from 'react-helmet';
import Fade from 'react-reveal/Fade';
// https://www.react-reveal.com/examples/common/fade/
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import { Cookies } from 'react-cookie'; 

import Api from '../utils/Api';
import Menu from '../components/menu';
import './index.scss';

const cookies = new Cookies();
const Home = props => {
  const { indexMarkdown } = props;
  return (
    <div>
      <Helmet
        title="Park Sungryeol - portfolio"
        meta={[{ property: 'og:title', content: 'Index' }]}
      />
      <Menu />
      <div className="titlebox">
        <Fade left>
          <div>
            <h1>Park Sungryeol</h1>
            <h2>박_성렬</h2>
            <h3>work and portfolio</h3>
          </div>
        </Fade>
      </div>
      <ReactMarkdown source={indexMarkdown} />
    </div>
  );
};

Home.getInitialProps = async props => {
  const { req, res, err, pathname, query, asPath } = props;
  if (req) {
    // server side
  }
  // client & server side
  const api = new Api();
  if (!req) api.setToken(cookies.get('token'));
  const indexMarkdown = await api.getIndex();
  console.log('index markdown', indexMarkdown);
  return { indexMarkdown };
};

export default Home;
