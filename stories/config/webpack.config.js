const loaders = require('../../webpack/loaders');
const alias = require('../../webpack/alias');

module.exports = ({ config }) => {
  config.module.rules = config.module.rules.filter(rule => {
    return rule.test.toString().indexOf('svg|') < 0;
  });

  config.module.rules.push(...loaders);
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('react-docgen-typescript-loader'),
      },
    ],
  });

  config.resolve.extensions.push('.ts', '.tsx');
  config.resolve.alias = {
    ...config.resolve.alias,
    ...alias,
  };

  return config;
};
