'use strict';
var webpack = require('webpack'),
path = require('path');
// PATHS
var PATHS = {
  app: __dirname + '/www',
  bower: __dirname + '/www/lib'
};
// webpack.config.js
module.exports = {
  context: PATHS.app,
  entry: {
    app: './index.js'
  },
  output: {
    path: PATHS.app,
    filename: 'bundle.js'
  },
  loaders: [
    {
      test: /\.js$/,
      loader: 'ng-annotate!babel',
      exclude: /node_modules|bower_components/
    }
  ]
};
