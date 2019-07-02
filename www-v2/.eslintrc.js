module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb'],
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
  overrides: [{files: ['pages']}],
  rules: {
    'arrow-parens': 0,
    'no-unused-vars': 1,
    'react/react-in-jsx-scope': 1,
    'react/jsx-filename-extension': 0,
    'arrow-body-style': 0,
    'react/react-in-jsx-scope': 0,
    'react/button-has-type': 0,
  }
};
