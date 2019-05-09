import Helmet from 'react-helmet';
import * as Yup from 'yup';
import { Formik, Field } from 'formik';
import { Cookies } from 'react-cookie';
import { useEffect, Fragment } from 'react';
import Router, { withRouter } from 'next/router'; // Router is for server, withRouter is for client
import { connect } from 'react-redux';
import { TextField } from 'formik-material-ui';
import Button from '@material-ui/core/Button';
// import withStyles from '@material-ui/core/styles/withStyles';

import { asyncLogin } from '../actions/user';
import Menu from '../components/menu';

const cookies = new Cookies();

const validationLogin = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email()
    .required('Required'),
  password: Yup.string()
    .trim()
    .min(3)
    .required('Required'),
});

const FormLogin = props => {
  const {
    values,
    touched,
    errors,
    dirty, // when valiation fails
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
  } = props;

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="email" style={{ display: 'block' }}>
          Email
        </label>
        <input
          id="email"
          placeholder="Enter your email"
          type="text"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={
            errors.email && touched.email ? 'text-input error' : 'text-input'
          }
        />
        {errors.email && touched.email && (
          <div className="input-feedback">{errors.email}</div>
        )}
        <label htmlFor="password" style={{ display: 'block' }}>
          password
        </label>
        <input
          id="password"
          placeholder="Enter your password"
          type="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={
            errors.password && touched.password
              ? 'text-input error'
              : 'text-input'
          }
        /> */}
        <Field name="email" type="text" label="email" component={TextField} />
        <Field name="password" type="password" label="password" component={TextField} />
        <Button
          onClick={handleReset}
          disabled={!dirty || isSubmitting}
          color="primary"
          variant="contained"
        >
          Reset
        </Button>
        <Button type="submit" disabled={isSubmitting} color="primary" variant="contained">
          Submit
        </Button>
        {/* {JSON.stringify(props)} */}
      </form>
    </Fragment>
  );
};

const Login = props => {
  const { user, dispatch, router } = props;
  useEffect(() => {
    if (user.token) router.push('/admin');
  }, [user]);
  const submitLogin = async ({ email, password }, { setSubmitting }) => {
    dispatch(asyncLogin(email, password));
    setSubmitting(false);
  };

  return (
    <div>
      <Helmet
        title="Login | Hello next.js!"
        meta={[{ property: 'og:title', content: 'Login' }]}
      />
      <Menu />
      Please Log in
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={submitLogin}
        validationSchema={validationLogin}
      >
        {FormLogin}
      </Formik>
    </div>
  );
};

Login.getInitialProps = async ctx => {
  const token = cookies.get('token');
  if (token) {
    if (ctx.res) {
      ctx.res.writeHead(302, {
        Location: '/admin',
      });
      ctx.res.end();
    } else {
      Router.push('/admin');
    }
  } else {
    return {};
  }
};

const mapStateToProps = state => state;
export default connect(mapStateToProps)(withRouter(Login));
