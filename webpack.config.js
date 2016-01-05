const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Path = require('path');
const Webpack = require('webpack');

const ROOT_PATH = Path.resolve(__dirname);

function getEntrySources(sources) {
  if (process.env.NODE_ENV !== 'production') {
    sources.push('webpack-hot-middleware/client');
  }

  return sources;
}

var basePlugins = [
  new Webpack.DefinePlugin({
    __DEV__: process.env.NODE_ENV !== 'production',
    __PRODUCTION__: process.env.NODE_ENV === 'production',
  }),
  new HtmlWebpackPlugin({
    template: './src/templates/index.html',
    inject: 'body',
  }),
  new ExtractTextPlugin('css/styles.css')
];

var devPlugins = [
  new Webpack.HotModuleReplacementPlugin(),
  new Webpack.NoErrorsPlugin(),
];

var prodPlugins = [
  new Webpack.optimize.OccurenceOrderPlugin(),
  new Webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false,
    },
  })
];

const PLUGINS = basePlugins
  .concat(process.env.NODE_ENV === 'production' ? prodPlugins : [])
  .concat(process.env.NODE_ENV === 'development' ? devPlugins : []);

module.exports = {
  entry: {
    app: getEntrySources(['./src/app'])
  },
  output: {
    path: Path.resolve(ROOT_PATH, 'public'),
    filename: 'js/[name].[hash].js',
    publicPath: '/',
    sourceMapFilename: 'js/[name].[hash].js.map',
    chunkFilename: '[id].chunk.js',
  },
  devtool: 'source-map',
  plugins: PLUGINS,
  module: {
    preLoaders: [
      { test: /\.js$/, loader: 'source-map-loader' }
    ],
    loaders: [
      { test: /\.js$/, loaders: ['react-hot', 'babel-loader?stage=0'], exclude: /node_modules/ },
      { test: /\.(png|jpg|jpeg|gif|svg)$/, loader: 'file?name=img/[name].[ext]' },
      { test: /\.styl$/, loader: ExtractTextPlugin.extract('style', 'css!stylus') }
    ]
  }
};
