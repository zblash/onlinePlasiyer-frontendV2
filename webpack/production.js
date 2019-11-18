const merge = require('webpack-merge');
const { resolve } = require('path');

const commonConfig = require('./common');

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: './root/index.tsx',
  output: {
    filename: 'index.js',
    path: resolve(process.cwd(), 'dist/'),
    publicPath: '/',
  },
});
