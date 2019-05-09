import Helmet from 'react-helmet';
import { useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';

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
      {
        <Select onChange={e => setPostType(e.target.value)} value={postType}>
          <MenuItem value="index">modify info for index page</MenuItem>
          <MenuItem value="stack">modify tech stack</MenuItem>
          <MenuItem value="post">post new work</MenuItem>
        </Select>
      }
      <Paper>
        {/* props are optional, they are there for expansion */}
        {/* dynamic components === {Component} instead of <Component /> */}
        {Post({ ...props, type: postType })}
      </Paper>
    </div>
  );
};

Admin.getInitialProps = async ctx => {
  await handleAuthSSR(ctx);
  return {};
};

export default Admin;
