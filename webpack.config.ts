const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index',
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js'
  },
  devServer: {
    port: 3000,
    historyApiFallback: true
  },
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'src')],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss']
  },
  module: {
    rules: [
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif|pdf|mp4|jpeg|webp|webm|svg|pdf|mp3|pptx)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      }
    ]
  },
  performance: {
    hints: false,
    maxEntrypointSize: 600000,
    maxAssetSize: 600000
  },
  plugins: [
    new HtmlWebpackPlugin({
      name: 'index.html',
      inject: false,
      template: './public/index.html',
      favicon: './public/favicon.ico'
    })
  ]
};
