const withCSS = require('@zeit/next-css');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const { enhanceAll } = require('./lib/util');

const webpackConfig = {
  plugins: {
    // 'postcss-css-variables': {},
  },
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html',
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html',
    },
  },
  webpack: config => config,
};

const enhancers = [withCSS, withBundleAnalyzer];
const enhanced = enhanceAll(webpackConfig, enhancers);

module.exports = enhanced;
