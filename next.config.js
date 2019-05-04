require('dotenv').config();
const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const path = require('path');
const Dotenv = require('dotenv-webpack');

const defaultConfig = {
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
};
if (process.env.NODE_ENV === 'production') {
  defaultConfig.distDir = 'build';
}

module.exports = withBundleAnalyzer(
  withCss(withSass({
    ...defaultConfig,
    webpack(_config, options) {
      _config.plugins = _config.plugins || [];
      _config.plugins.push(
        new Dotenv({
          path: path.join(__dirname, '.env'),
          systemvars: true,
        }),
      );
      return _config;
    },
  })),
);
