const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDevelopment = process.env.NODE_ENV === 'development';

console.log(isDevelopment);

function styleLoader() {
  const baseLoader = isDevelopment
    ? 'style-loader'
    : {
        loader: MiniCssExtractPlugin.loader,
      };

  return [
    {
      test: /\.(sa|sc|c)ss$/,
      use: [baseLoader, 'css-loader', 'sass-loader'],
    },
  ];
}

module.exports = styleLoader;
