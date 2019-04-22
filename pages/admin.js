import styleTest from '../styles/test.scss';
import Helmet from 'react-helmet';
import Menu from '../components/menu';
import { handleAuthSSR } from '../utils/auth';
const Admin = () => {
  return (
  <div className="example">
    <Helmet
      title='Admin | Hello next.js!'
      meta={[{ property: 'og:title', content: 'About' }]}
    />
    <Menu />
    This is admin page, nobody should be allowed to access here without token;
  </div>);
};

Admin.getInitialProps = async props => {
  await handleAuthSSR(props);
  return {};
};

export default Admin;