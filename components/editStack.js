import * as Yup from 'yup';
import { withRouter } from 'next/router';
import { Formik, FieldArray, Field } from 'formik';
import { connect } from 'react-redux';
import { useLayoutEffect, useState, useEffect } from 'react';
import { asyncGetStacks, setStacks, setStack } from '../actions/info';
import FileUpload from './fileUpload';

const renderStacks = (aryHelper) => {
  console.log(aryHelper);
  const { remove, push, form } = aryHelper;
  return (
    <div>
      {form.values.stacks.map((stack, index) => (
        <div key={index}>
          <label htmlFor={`stacks[${index}].name`}>
            name
            <Field name={`stacks[${index}].name`} />
          </label>
          <label>
            desc
            <Field name={`stacks[${index}].desc`} />
          </label>
          <FileUpload name={`stacks[${index}].icon`} form={form} />
          <button type="button" onClick={() => remove(index)}>
            -
          </button>
        </div>
      ))}
      <button type="button" onClick={() => push({ name: '', age: '' })}>
        +
      </button>
    </div>
  );
};


const EditStack = ({ info: { stacks }, dispatch, router }) => {
  useLayoutEffect(() => {
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
    console.log('submitting', props.stacks);
    setSubmitting(false);
  };

  return (
    <div>
      <Formik initialValues={{ stacks }} onSubmit={submitStacks}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <FieldArray name="stacks" render={renderStacks} />
            <button type="submit">save current stacks</button>
          </form>
        )}
      </Formik>
    </div>
  );
};

const mapStateToProps = state => state;
export default connect(mapStateToProps)(withRouter(EditStack));
