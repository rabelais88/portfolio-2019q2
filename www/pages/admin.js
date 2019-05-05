import Helmet from 'react-helmet';
import { useState } from 'react';
import { Select, MenuItem } from '@material-ui/core';

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
    <div className="page--admin">
      <Helmet
        title="Sungryeol Park Admin Page"
        meta={[{ property: 'og:title', content: 'Admin' }]}
      />
      <Menu />
      <Select onChange={e => setPostType(e.target.value)} value={postType}>
        <MenuItem value="index">modify info for index page</MenuItem>
        <MenuItem value="stack">modify tech stack</MenuItem>
        <MenuItem value="post">post new work</MenuItem>
      </Select>
      {/* props are optional, they are there for expansion */}
      <Post type={postType} {...props} />
    </div>
  );
};

Admin.getInitialProps = async ctx => {
  await handleAuthSSR(ctx);
  return {};
};

export default Admin;
