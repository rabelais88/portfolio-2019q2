import Helmet from 'react-helmet';
import Menu from '../components/menu';
import { handleAuthSSR } from '../utils/auth';
const Gallery = () => {
  return (
  <div className="example">
    <Helmet
      title='Gallery | Hello next.js!'
      meta={[{ property: 'og:title', content: 'About' }]}
    />
    <Menu />
    This is gallery, where you can see my past works
  </div>);
};

Gallery.getInitialProps = async ctx => {
  console.log(ctx);
  return {};
};

export default Gallery;