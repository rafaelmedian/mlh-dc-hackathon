const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// loaders
const js = require('./loaders/js');
const css = require('./loaders/css');
const file = require('./loaders/file');
const constants = require('./constants');

const {
  HOST,
  PORT,
  ENV_VARS,
  ENTRY_FILE,
  VENDOR_LIBS,
  TEMPLATE_FILE,
} = constants;

const hotMiddlewareScript = [
  'webpack-hot-middleware/client',
  `?path=http://${HOST}:${PORT}/__webpack_hmr`,
  '&timeout=20000',
  '&reload=true'
].join('');

const config = {
  devtool: '#source-map',
  entry: {
    bundle: [ENTRY_FILE, hotMiddlewareScript],
    vendors: VENDOR_LIBS,

  },
  output: {
    path: '/',
    filename: '[name].js',
    publicPath: `http://${HOST}:${PORT}/`,
  },
  module: {
    rules: [
      js.loader,
      ...css.loader,
      file.loader,
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ template: TEMPLATE_FILE, }),
    new webpack.optimize.CommonsChunkPlugin({ names: ['vendors', 'manifest'] }),
    new webpack.DefinePlugin({
      'process.env': ENV_VARS
    }),
    css.extract
  ]
};

module.exports = config;
