module.exports = {
  // Other webpack configurations...
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(@metamask|@walletconnect|eth-rpc-errors|json-rpc-engine|superstruct)/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
    ],
  },
};
