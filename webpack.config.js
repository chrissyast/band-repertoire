const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const path = require('path');


module.exports = {
  entry: path.resolve(__dirname, '') + '/app/javascript/packs/index.jsx',
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      VERSION: JSON.stringify('5fa3b9'),
      BROWSER_SUPPORTS_HTML5: true,
      TWO: '1+1',
      'typeof window': JSON.stringify('object'),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
    module: {
    rules: [
      { test: /\.jsx$/, use: {loader:'babel-loader'} },
      { test: /\.js$/, use: {loader:'babel-loader'} }
    ]
  },
  node: {fs:"empty"},
  output: {
    publicPath: '/'
  }
};
