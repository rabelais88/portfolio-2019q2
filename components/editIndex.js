import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import { useLayoutEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import _get from 'lodash/get';
const EditIndex = props => {
  const [markdown, setMarkdown] = useState(null);
  useLayoutEffect(() => {
    (async () => {
      const token = _get(props, 'user.token');
      const infoIndex = await axios.get(`${process.env.API_URL}/info-index`, { headers: { authorization: token } });
      setMarkdown(infoIndex);
    })();
  }, []);
  if (!markdown) return <div><h1>loading for index page editing...</h1></div>
  return (
  <form>
    <h1>editing index page</h1>
    <textarea onChange={e => setMarkdown(e.target.value)} value={markdown} />
    <ReactMarkdown source={markdown} />
    <input type="submit">submit and modify</input>
  </form>
  );
}
const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps)(EditIndex);