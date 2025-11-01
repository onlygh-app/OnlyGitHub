module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main.ts',
  target: 'electron-main',
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.main.rules'),
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  output: {
    path: `${__dirname}/.webpack/main`,
    filename: 'index.js',
  },
};
