const webpack = require('webpack');

module.exports = function override(config, env) {
  // Remove ReactRefreshWebpackPlugin if it's present
  if (config.plugins) {
    config.plugins = config.plugins.filter(
      (plugin) => plugin.constructor.name !== 'ReactRefreshWebpackPlugin'
    );
  }

  // Optional: Add your fallback configuration (if needed)
  config.resolve.fallback = {
    ...config.resolve.fallback,
    process: require.resolve('process/browser.js'),
    stream: require.resolve('stream-browserify'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    os: require.resolve('os-browserify/browser'),
  };

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
      Buffer: ['buffer', 'Buffer'],
    }),
  ]);

  return config;
};
