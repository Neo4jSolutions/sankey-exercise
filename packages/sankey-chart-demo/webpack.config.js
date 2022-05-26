const path = require('path');
const Webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const mode = process.env.NODE_ENV;
const isDev = mode !== 'production';

const basePath = __dirname;
const publicPath = '';

module.exports = {
  mode: process.env.NODE_ENV,
  entry: [path.join(basePath, 'src/demo.js')],
  output: {
    filename: 'app-[hash].js',
    chunkFilename: '[name]-[hash].bundle.js',
    publicPath: publicPath,
    path: path.join(basePath, 'dist')
  },
  plugins: [
    new Webpack.DefinePlugin({
      BASE_PATH: JSON.stringify(publicPath),
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './data', to: 'data/' },
        { from: '../sankey-chart/src/sankey-chart.css', to: 'css/' }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      path: 'dist',
      filename: 'index.html'
    }),
    new HtmlWebpackTagsPlugin({
      links: [
        'css/sankey-chart.css'
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [path.join(basePath, 'src')],
        loader: 'babel-loader',
        options: {
          configFile: path.join(__dirname, '../../babel.config.js')
        },
      },
      {
        test: /\.css$/, // global css files that don't need any processing
        include: [path.join(basePath, 'src')],
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|gif|jpg|svg)$/,
        include: [path.join(basePath, 'src')],
        use: 'file-loader?limit=20480&name=assets/[name]-[hash].[ext]'
      },
      {
        test: /\.woff$/,
        include: [path.join(basePath, 'src')],
        use:
          'file-loader?limit=65000&mimetype=application/font-woff&name=assets/fonts/[name].[ext]'
      },
      {
        test: /\.woff2$/,
        include: [path.join(basePath, 'src')],
        use:
          'file-loader?limit=65000&mimetype=application/font-woff2&name=assets/fonts/[name].[ext]'
      },
      {
        test: /\.[ot]tf$/,
        include: [path.join(basePath, 'src')],
        use:
          'file-loader?limit=65000&mimetype=application/octet-stream&name=assets/fonts/[name].[ext]'
      },
      {
        test: /\.eot$/,
        include: [path.join(basePath, 'src')],
        use:
          'file-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=assets/fonts/[name].[ext]'
      },
    ]
  },
  optimization: {},
  devtool: isDev ? 'cheap-module-source-map' : 'source-map',
  devServer: {
    host: '0.0.0.0',
    port: 8585,
    disableHostCheck: true
  }
};