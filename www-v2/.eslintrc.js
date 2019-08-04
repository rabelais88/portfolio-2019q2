module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb', 'stylelint'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'prettier/prettier': 0,
  },
  overrides: [{ files: ['pages'] }],
  rules: {
    'arrow-parens': 0,
    'no-unused-vars': 1,
    'react/react-in-jsx-scope': 1,
    'react/jsx-filename-extension': 0,
    'arrow-body-style': 0,
    'react/react-in-jsx-scope': 0,
    'react/button-has-type': 0,
    'no-param-reassign': 1,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-closing-tag-location': 0,
    'react/prop-types': 1,
    'spaced-comment': 0,
    'no-underscore-dangle': 1,
  },
};
