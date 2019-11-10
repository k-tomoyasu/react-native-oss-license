const merge = require('webpack-merge');
const base = require('./webpack.config.js');
const SizePlugin = require('size-plugin');

module.exports = merge(base, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [new SizePlugin()]
});
