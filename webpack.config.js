const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development' || false;
const distPath = resolve(__dirname, 'dist');
const nodeModules = resolve(__dirname, 'node_modules');

/* eslint-disable global-require */
const postcssPlugins = [
  require('postcss-import'),
  require('postcss-partial-import'),
  require('stylelint'),
  require('precss'),
  require('autoprefixer'),
];
/* eslint-enable global-require */

// HtmlWebpackPlugin options
const htmlOptions = {
  template: 'src/index.html',
  filename: 'index.html',
};

module.exports = {
  devtool: isDev ? 'eval-source-map' : false,

  entry: [
    '@babel/polyfill',
    resolve(__dirname, 'src/index.js'),
  ],

  output: {
    path: distPath,
    publicPath: '/',
    filename: 'js/bundle.[hash:6].js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: nodeModules,
        loader: 'eslint-loader',
        enforce: 'pre',
      },
      {
        test: /\.js$/,
        exclude: nodeModules,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true,
              localIdentName: isDev ? '[local]--[hash:base64:5]' : '[hash:base64:5]',
              minimize: !isDev,
              sourceMap: isDev,
            },
          },
          { loader: 'resolve-url-loader' },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: postcssPlugins,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
      },
    ],
  },

  plugins: isDev ? [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new HtmlWebpackPlugin(htmlOptions),
    new FriendlyErrorsWebpackPlugin(),
  ] :
    [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new HtmlWebpackPlugin(htmlOptions),
    ],

  resolve: {
    modules: [nodeModules],
    extensions: ['.js'],
  },

  devServer: {
    hot: isDev,
    host: '0.0.0.0',
    port: 8080,
    contentBase: distPath,
    inline: isDev,
    compress: !isDev,
    disableHostCheck: true,
    quiet: true,
  },
};
