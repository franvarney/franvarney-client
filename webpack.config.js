var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var Path = require('path');
var Webpack = require('webpack');

var ROOT_PATH = Path.resolve(__dirname);

module.exports = {
  entry: Path.resolve(ROOT_PATH, './src/app'),
  output: {
    path: Path.resolve(ROOT_PATH, 'public'),
    filename: '/js/app.js'
  },
  module: {
    loaders: [
      { test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.styl$/, loader: ExtractTextPlugin.extract('style', 'css!stylus') }
    ]
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Fran Varney'
    }),
    new ExtractTextPlugin('/css/styles.css')
  ]
};
