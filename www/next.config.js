require('dotenv').config();
const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const withOffline = require('next-offline');

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
// if (process.env.NODE_ENV === 'production') {
//   defaultConfig.distDir = 'build';
// }

const webpackSetup = (_config, options) => {
  _config.plugins = _config.plugins || [];
  _config.plugins.push(
    new Dotenv({
      path: path.join(__dirname, '.env'),
      systemvars: true,
    }),
  );
  return _config;
};

// https://developers.google.com/web/tools/workbox/guides/common-recipes
const workboxOpts = {
  dontAutoRegisterSw: true,
  generateInDevMode: true,
  runtimeCaching: [
    {
      urlPattern: /\.(js|css)$/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'js',
      },
    },
    {
      urlPattern: /\.(png|jpg|jpeg|gif|svg)$/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'images',
      },
    },
    {
      urlPattern: /^https:\/\/fonts\.gstatic\.com/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'fonts',
        expiration: {
          maxEntries: 3,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'fonts',
      },
    },
  ],
};

if (process.env.NODE_ENV === 'development') {
  defaultConfig.generateInDevMode = true;
}

const enhance = (webpackOpts, enhancers) => {
  if (!Array.isArray(enhancers)) throw new Error('[next.config.js] must provide array of enhancers in webpack');
  return enhancers.reduce((ac, cv) => cv(ac), webpackOpts);
};

const plugins = [
  withBundleAnalyzer,
  withSass,
  withCss,
  withOffline,
];
const enhancedWebpack = enhance({ ...defaultConfig, webpack: webpackSetup, workboxOpts }, plugins);

// module.exports = withBundleAnalyzer(
//   withCss(withSass({
//     ...defaultConfig,
//     webpack(_config, options) {
//       _config.plugins = _config.plugins || [];
//       _config.plugins.push(
//         new Dotenv({
//           path: path.join(__dirname, '.env'),
//           systemvars: true,
//         }),
//       );
//       return _config;
//     },
//   })),
// );

module.exports = enhancedWebpack;
