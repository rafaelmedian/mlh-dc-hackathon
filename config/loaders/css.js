const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('styles.css');

const cssLoader = [
  {
    test: /\.css$/,
    use: extractCSS.extract(['css-loader'])
  },
  {
    test: /\.scss$/i,
    use: extractCSS.extract(['css-loader', 'sass-loader'])
  },
];

module.exports = {
  loader: cssLoader,
  extract: extractCSS,
};