const webpack = require('webpack');

module.exports = {
  resolve: {
    alias: {
      // Map the import to the full filename.
      'process/browser': require.resolve('process/browser.js')
    },
    fallback: {
      stream: require.resolve('stream-browserify'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser'),
      crypto: require.resolve('crypto-browserify'),
      assert: require.resolve('assert/'),
      path: require.resolve('path-browserify'),
      url: require.resolve('url'),
      process: require.resolve('process/browser.js')
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
};
