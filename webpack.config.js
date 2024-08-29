const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
})

const copyWebpackPlugin = new CopyWebpackPlugin({ patterns: [
  { from: 'src/public/', to: 'public/' }, 
  { from: 'src/output.css', to: 'public/output.css' }, 
]});

// TODO: convert resume.pdf -> resume.jpg
// TODO: convert full-size photos to resized versions

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: './dist/bundle.js',
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', ".png", ".jpg", ".css"],
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader', // compiles Sass to CSS
        ],
      },
      {
        test: /\.(png|jpe?g|gif|css)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'public/',
        },
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },

  plugins: [
    htmlPlugin, copyWebpackPlugin
  ],
}
