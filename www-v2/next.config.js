const path = require('path')
require('dotenv').config({
  path: path.join(__dirname, `.env.${process.env.NODE_ENV}`),
  systemvars: true
})
const Dotenv = require('dotenv-webpack')
const withCSS = require('@zeit/next-css');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const { enhanceAll } = require('./lib/util');

const webpackConfig = {
  publicRuntimeConfig: process.env,
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
  webpack: (config, options) => {
    // config.resolve.alias['@'] = __dirname; // absolute import
    config.plugins = config.plugins || [];
    // config.plugins.push(new Dotenv({
    //   path: path.join(__dirname, `.env.${process.env.NODE_ENV}`),
    //   systemvars: true
    // }))
    return config;
  },
};

const enhancers = [withCSS, withBundleAnalyzer];
const enhanced = enhanceAll(webpackConfig, enhancers);

module.exports = enhanced;
