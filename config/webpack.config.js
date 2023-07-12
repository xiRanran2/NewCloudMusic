const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const WebpackBar = require('webpackbar');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')
module.exports = {
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[fullhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.jsx$/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.template$/,
        use: {
          loader: path.resolve(__dirname, './loaders/template.js'),
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(woff | eot | ttf | otf | svg)$/,
        type: 'asset/resource',
      },
      {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'stylus-loader'
        ]
      }
    ],
  },
  mode: process.env.NODE_ENV,
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../src'),
    },
    extensions : ['.js','.json','.jsx']
  },
  externals: {
    vue: 'Vue',
  },
  devServer: {
    open: true,
    // 配置前端请求代理
    proxy: {
      '^/api': {
        target: 'https://www.starbucks.com.cn/',
      },
      '^/bff': {
        target: 'https://bff.starbucks.com.cn/',
        pathRewrite: { '/api1': '' },
      },
    },
    client: {
      overlay: false,
    },
  },
  plugins: [
    new WebpackBar(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      cdn: {
        script: ['https://cdn.jsdelivr.net/npm/vue@2'],
        style: [],
      },
    }),
    new VueLoaderPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "./src/static", to: "./static" },
      ],
    }),
  ],
};
