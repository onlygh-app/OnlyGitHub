module.exports = [
  // TypeScript and JSX loader configuration
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|.webpack)/,
    use: [{
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
        compilerOptions: {
          jsx: 'react-jsx'
        }
      }
    }]
  },
  // SCSS/SASS loader configuration
  {
    test: /\.scss$/,
    use: [
      'style-loader',
      'css-loader',
      'sass-loader'
    ]
  }
];
