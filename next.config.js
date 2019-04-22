const withSass = require('@zeit/next-sass')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');

const defaultConfig = {
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html'
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html'
    }
  },
};
if (process.env.NODE_ENV === 'production') {
  defaultConfig.distDir = 'build';
}

module.exports = withBundleAnalyzer(withSass({
  ...defaultConfig,
  webpack(_config, options) {
    return _config;
  }
}));