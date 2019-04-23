import styleTest from '../styles/test.scss';
import Helmet from 'react-helmet';
import Menu from '../components/menu';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useState, useEffect } from 'react';

const cookies = new Cookies();

const validationLogin = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email()
    .required('Required'),
  password: Yup.string()
    .trim()
    .min(3)
    .required('Required')
});

const formLogin = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email" style={{ display: 'block' }}>
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
      {errors.email &&
        touched.email && <div className="input-feedback">{errors.email}</div>}
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
        className={errors.password && touched.password ? 'text-input error' : 'text-input'}
      />
      <button
        type="button"
        className="outline"
        onClick={handleReset}
        disabled={!dirty || isSubmitting}
      >
        Reset
      </button>
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
      {JSON.stringify(props)}
    </form>
  );
}

const Login = () => {
  const [ token, setToken ] = useState(null);

  useEffect(() => {
    if (token) cookies.set('token', token);
    console.log('cookie has been set');
  }, [token]);

  const submitLogin = async (values, { setSubmitting }) => {
    let apiUrl = `http://localhost:${process.env.PORT}/auth`;
    if (process.env.NODE_ENV === 'production') apiUrl = `${process.env.API_URL}/auth`;
    const res = await axios.post(apiUrl, values);
    if (res.data.token) setToken(res.data.token);
    setSubmitting(false);
  };

  return (
  <div className="example">
    <Helmet
      title='Login | Hello next.js!'
      meta={[{ property: 'og:title', content: 'Login' }]}
    />
    <Menu />
    Please Log in
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={submitLogin}
      validationSchema={validationLogin}
    >
      {formLogin}
    </Formik>
  </div>);
};

Login.getInitialProps = async props => {
  const { req, res, err, pathname, query, asPath } = props;
  // const res = await fetch('https://api.github.com/repos/zeit/next.js');
  // const json = await res.json();
  // return { stars: json.stargazers_count };
  // console.log(props);
  return [];
};

export default Login;