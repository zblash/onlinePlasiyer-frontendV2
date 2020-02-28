const { CheckerPlugin } = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const paths = require('./paths');
const loaders = require('./loaders');
const alias = require('./alias');

const nodeEnv = process.env.NODE_ENV || 'production';
const isProduction = nodeEnv === 'production';

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias,
  },
  context: paths.appSrc,
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
      template: 'root/index.html.ejs',
      templateParameters: {
        injectScript: isProduction ? 'window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function () {}' : '',
      },
    }),
  ],
  performance: {
    hints: false,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      minChunks: 1,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
