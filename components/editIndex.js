import * as Yup from 'yup';
import { Formik } from 'formik';
import { useLayoutEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import _get from 'lodash/get';

// import { getIndex } from '../utils/api';
import { logout } from '../actions/user';
import { asyncGetIndex, setIndex } from '../actions/admin';

const EditIndex = props => {
  const markdown = _get(props, 'admin.indexMarkdown');
  // const [markdown, setMarkdown] = useState(null);
  useLayoutEffect(() => {
    props.dispatch(asyncGetIndex());
  }, []);
  if (!markdown) {
    return (
      <div>
        <h1>loading for index page editing...</h1>
      </div>
    );
  }
  return (
    <form>
      <h1>editing index page</h1>
      <textarea onChange={e => props.dispatch(setIndex(e.target.value))} value={markdown} />
      <h2>markdown preview</h2>
      <ReactMarkdown source={markdown} />
      <button type="submit">submit and modify</button>
    </form>
  );
};
const mapStateToProps = state => state;
export default connect(mapStateToProps)(EditIndex);
