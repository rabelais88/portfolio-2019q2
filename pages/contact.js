import Helmet from 'react-helmet';
import Menu from '../components/menu';

const Contact = () => {
  return (
    <div>
      <Helmet
        title="Contact | Hello next.js!"
        meta={[{ property: 'og:title', content: 'Contact' }]}
      />
      <Menu />
      This is about page;
    </div>
  );
};

Contact.getInitialProps = async ctx => {
  const { req, res, err, pathname, query, asPath } = ctx;
  // const res = await fetch('https://api.github.com/repos/zeit/next.js');
  // const json = await res.json();
  // return { stars: json.stargazers_count };
  // console.log(props);
  return [];
};

export default Contact;
