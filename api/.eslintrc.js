module.exports = {
  env: {
    es6: true,
		node: true,
		mocha: true
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['mocha'],
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'consistent-return': 'off',
    curly: 'off',
    'nonblock-statement-body-position': 'off',
		'arrow-parens': 'off',
    'prefer-destructuring': 'warn',
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',
    'object-curly-newline': 0,
  },
};
