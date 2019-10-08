// shared config (dev and prod)
const { resolve } = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const externalPackages = require('./packages');
const svgLoader = require('./svg-loader');

const appSrc = resolve(__dirname, '../../src');
const externals = {};
externalPackages.forEach(pac => {
  externals[pac.npmName] = pac.cdnName;
});

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '~': appSrc,
    },
  },
  context: appSrc,
  module: {
    rules: [
      svgLoader,
      {
        test: /\.js$/,
        use: ['babel-loader', 'source-map-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'awesome-typescript-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }],
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }, 'sass-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: /src\/assets\/icons/,
        include: /src\/assets\/images/,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
        ],
      },
    ],
  },
  plugins: [
    new CheckerPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html.ejs',
      templateParameters: {
        packages: Object.values(externalPackages),
      },
    }),
  ],
  externals,
  performance: {
    hints: false,
  },
};
