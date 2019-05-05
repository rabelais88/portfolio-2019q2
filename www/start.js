require('@babel/register')({
  presets: ['@babel/preset-env'],
  ignore: ['node_modules', '.next', 'build'],
});

module.exports = require('./server/server');
