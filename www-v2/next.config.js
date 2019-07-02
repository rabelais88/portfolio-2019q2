const withCSS = require('@zeit/next-css');
const { enhanceAll } = require('./lib/util');

const webpackConfig = {
  plugins: {
    // 'postcss-css-variables': {},
  },
};

const enhancers = [withCSS];
const enhanced = enhanceAll(webpackConfig, enhancers);

module.exports = enhanced;
