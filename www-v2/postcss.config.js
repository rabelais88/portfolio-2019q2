module.exports = {
  // parser: 'sugarss',
  plugins: {
    'postcss-import': {
      // root: __dirname,
      path: ['styles'],
    },
    'postcss-preset-env': {},
    'postcss-simple-vars': {},
    'postcss-nested': {},
    'postcss-custom-media': {},
    'postcss-discard-comments': {},
    'postcss-mixins': {},
    autoprefixer: {},
    cssnano: {},
  },
};
