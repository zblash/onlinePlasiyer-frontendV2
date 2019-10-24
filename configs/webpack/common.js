const { resolve } = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const loaders = require('./loaders');

const appSrc = resolve(__dirname, '../../src');

const nodeEnv = process.env.NODE_ENV || 'production';
const isProduction = nodeEnv === 'production';

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '~': appSrc,
    },
  },
  context: appSrc,
  module: {
    rules: loaders,
  },
  plugins: [
    new CheckerPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
    new HtmlWebpackPlugin({
      template: 'index.html.ejs',
      templateParameters: {
        injectScript: isProduction ? 'window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function () {}' : '',
      },
      inject: true,
    }),
  ],
  performance: {
    hints: false,
  },
};
