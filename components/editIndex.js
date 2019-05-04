import * as Yup from 'yup';
import { Formik, Field } from 'formik';
import { useLayoutEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import { withRouter } from 'next/router';

import { asyncGetIndex, asyncSetIndex } from '../actions/info';

const EditIndex = props => {
  const { info, router, dispatch } = props;
  const markdown = _get(info, 'indexMarkdown');
  useLayoutEffect(() => {
    dispatch(asyncGetIndex(router));
  }, []);
  if (!markdown) {
    return (
      <div>
        <h1>loading for index page editing...</h1>
      </div>
    );
  }

  const submitIndex = (values) => {
    console.log(values.indexMarkdown);
    dispatch(asyncSetIndex(router, values.indexMarkdown));
    // dispatch(setIndex(values.indexMarkdown));
  };

  return (
    <Formik onSubmit={submitIndex} initialValues={{ indexMarkdown: markdown }}>
      {({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit} className="admin--index">
          <h1>editing index page</h1>
          <Field name="indexMarkdown" component="textarea" />
          <h2>markdown preview</h2>
          <ReactMarkdown source={values.indexMarkdown} />
          <button type="submit">submit and modify</button>
        </form>
      )}
    </Formik>
  );
};
const mapStateToProps = state => state;
export default connect(mapStateToProps)(withRouter(EditIndex));
