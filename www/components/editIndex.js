import * as Yup from 'yup';
import { Formik, Field } from 'formik';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import { withRouter } from 'next/router';
import { TextField } from 'formik-material-ui';
import Button from '@material-ui/core/Button';

import { asyncGetIndex, asyncSetIndex } from '../actions/info';

const EditIntro = props => {
  const { info, router, dispatch } = props;
  const markdown = _get(info, 'intro');
  useEffect(() => {
    dispatch(asyncGetIndex(router));
  }, []);
  if (!markdown) {
    return (
      <div>
        <h1>loading for index page editing...</h1>
      </div>
    );
  }

  const submitIndex = ({ intro }) => {
    console.log(intro);
    dispatch(asyncSetIndex(router, intro, 'successfully updated index'));
    // dispatch(setIndex(values.indexMarkdown));
  };

  return (
    <Formik onSubmit={submitIndex} initialValues={{ intro: markdown }}>
      {({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit} className="page--admin-index--form">
          <h1>editing index page</h1>
          <Field name="intro" label="markdown" component="textarea" />
          <h2>markdown preview</h2>
          <ReactMarkdown source={values.intro} />
          <Button type="submit" color="primary" variant="contained">submit and modify</Button>
        </form>
      )}
    </Formik>
  );
};
const mapStateToProps = state => state;
export default connect(mapStateToProps)(withRouter(EditIntro));
