import * as Yup from 'yup';
import { Formik, Field } from 'formik';
import { useLayoutEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import { withRouter } from 'next/router';
import { TextField } from 'formik-material-ui';
import Button from '@material-ui/core/Button';

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

  const submitIndex = ({ indexMarkdown }) => {
    console.log(indexMarkdown);
    dispatch(asyncSetIndex(router, indexMarkdown, 'successfully updated index'));
    // dispatch(setIndex(values.indexMarkdown));
  };

  return (
    <Formik onSubmit={submitIndex} initialValues={{ indexMarkdown: markdown }}>
      {({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit} className="page--admin-index--form">
          <h1>editing index page</h1>
          <Field name="indexMarkdown" label="markdown" component="textarea" />
          <h2>markdown preview</h2>
          <ReactMarkdown source={values.indexMarkdown} />
          <Button type="submit" color="primary" variant="contained">submit and modify</Button>
        </form>
      )}
    </Formik>
  );
};
const mapStateToProps = state => state;
export default connect(mapStateToProps)(withRouter(EditIndex));
