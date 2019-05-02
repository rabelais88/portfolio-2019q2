import * as Yup from 'yup';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { useLayoutEffect, useState, useEffect } from 'react';
import { asyncGetStacks, setStacks } from '../actions/info';

const Elstack = ({ name, desc, icon }) => {
  const [stack, setStack] = useState({ name, desc, icon });
  return <div>{JSON.stringify(stack)}</div>;
};

const EditStack = ({ info: { stacks }, dispatch }) => {
  useLayoutEffect(() => {
    dispatch(asyncGetStacks());
  }, []); // on mount

  const createStack = e => {
    e.preventDefault();
    const defaultStack = { name: 'noname', desc: 'nodesc', icon: null };
    dispatch(setStacks([...stacks, defaultStack]));
  };

  const saveStack = e => {
    e.preventDefault();
    // TODO
  };

  return (
    <div>
      {stacks.map(stack => <Elstack {...stack} />)}
      <button onClick={createStack}>add new stack</button>
      <button onClick={saveStack}>save current stacks</button>
    </div>
  );
};

const mapStateToProps = state => state;
export default connect(mapStateToProps)(EditStack);
