import { withRouter } from 'next/router';
import { Formik, FieldArray, Field } from 'formik';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { TextField } from 'formik-material-ui';

import { asyncGetStacks, setStacks, setStack } from '../actions/info';
import FileUpload from './fileUpload';

const renderStacks = (aryHelper) => {
  console.log(aryHelper);
  const { remove, push, form } = aryHelper;
  return (
    <div>
      {form.values.stacks.map((stack, index) => (
        <div key={index} className="stack-element--form">
          <Field name={`stacks[${index}].name`} component={TextField} label="name" />
          <Field name={`stacks[${index}].desc`} component="textarea" label="description" />
          <label>
            <span>icon</span>
            <FileUpload name={`stacks[${index}].icon`} form={form} />
          </label>
          <Button onClick={() => remove(index)} color="primary" variant="contained">
            -
          </Button>
        </div>
      ))}
      <Button onClick={() => push({ name: '', desc: '', icon: null })} color="primary" variant="contained">
        +
      </Button>
    </div>
  );
};

const EditStack = ({ info: { stacks }, dispatch, router }) => {
  useEffect(() => {
    dispatch(asyncGetStacks(router));
  }, []); // on mount

  const createStack = e => {
    e.preventDefault();
    const defaultStack = { name: 'noname', desc: 'nodesc', icon: null };
    defaultStack.id = stacks.length;
    dispatch(setStacks([...stacks, defaultStack]));
  };

  const saveStack = e => {
    e.preventDefault();
    // TODO
  };

  const submitStacks = (props, { setSubmitting }) => {
    // console.log('submitting', props.stacks);
    setSubmitting(false);
  };

  return (
    <div>
      <Formik initialValues={{ stacks }} onSubmit={submitStacks}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="page--admin-stack--form">
            <FieldArray name="stacks" render={renderStacks} />
            <Button type="submit" color="primary" variant="contained">save current stacks</Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

const mapStateToProps = state => state;
export default connect(mapStateToProps)(withRouter(EditStack));