const path = require('path');

const webpackConfig = {
  context: path.resolve(__dirname),
  entry: {
    main: './src/index.js',
  },
  output: {
    publicPath: 'dist/',
    path: path.resolve(__dirname, 'dist'),
    filename: 'metronome.js',
    sourceMapFilename: 'metronome.js.map',
    library: 'metronome',
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
  mode: 'production',
};

module.exports = webpackConfig;
