import Helmet from 'react-helmet';
import { useState } from 'react';

import CreatePost from '../components/createPost';
import EditIndex from '../components/editIndex';
import EditStack from '../components/editStack';
import Menu from '../components/menu';
import { handleAuthSSR } from '../utils/auth';

import './admin.scss';

const Post = props => {
  const { type } = props;
  switch (type) {
    case 'index':
      return <EditIndex {...props} />;
    case 'stack':
      return <EditStack {...props} />;
    case 'post':
      return <CreatePost {...props} />;
    default:
      return null;
  }
};

const Admin = props => {
  const [postType, setPostType] = useState('index');
  return (
    <div>
      <Helmet
        title="Sungryeol Park Admin Page"
        meta={[{ property: 'og:title', content: 'Admin' }]}
      />
      <Menu />
      <select onChange={e => setPostType(e.target.value)} value={postType}>
        <option value="index">modify info for index page</option>
        <option value="stack">modify tech stack</option>
        <option value="post">post new work</option>
      </select>
      <Post type={postType} {...props} />
    </div>
  );
};

Admin.getInitialProps = async ctx => {
  await handleAuthSSR(ctx);
  return {};
};

export default Admin;
