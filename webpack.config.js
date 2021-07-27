const path = require('path')

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'worker.js',
    path: path.join(__dirname, 'dist'),
  },
  devtool: 'cheap-module-source-map',
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    fallback: {
      'crypto': require.resolve('crypto-browserify'),
      'url': require.resolve('url/'),
      'https': require.resolve('https-browserify'),
      'http': require.resolve('stream-http'),
      'stream': require.resolve('stream-browserify'),
      'buffer': require.resolve('buffer/'),
      'path': require.resolve('path-browserify'),
      'fs': false,
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          // transpileOnly is useful to skip typescript checks occasionally:
          // transpileOnly: true,
        },
      },
    ],
  },
}
