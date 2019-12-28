const svgLoader = require('./svg-loader');
const styleLoader = require('./style-loader');

module.exports = [
  ...svgLoader(),
  ...styleLoader(),
  {
    test: /\.tsx?$/,
    loader: 'awesome-typescript-loader',
    options: {
      userBabel: true,
    },
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
  {
    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
    exclude: [/src\/assets\/icons/, /src\/assets\/images/],
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/',
        },
      },
    ],
  },
];
