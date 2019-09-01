const path = require('path');
const webpack = require('webpack');
const packageJson = require('./package.json');

const { version } = packageJson;

const webpackConfig = {
  context: path.resolve(__dirname),
  entry: {
    main: './src/index.js',
  },
  output: {
    publicPath: 'dist/',
    path: path.resolve(__dirname, 'dist'),
    filename: 'psmetronome.js',
    sourceMapFilename: 'psmetronome.js.map',
    library: 'ps-metronome',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.worker.js$/,
        exclude: /node_modules/,
        loader: 'raw-loader'
      }
    ]
  },
  mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(version),
    }),
  ]
};

module.exports = webpackConfig;
