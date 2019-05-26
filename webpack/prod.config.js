const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

// On build runs, this plugin will create an index.html file in the dist directory that
// adds css and bundle files into the index.html template defined below under 'plugins'
const HtmlWebpackPlugin = require('html-webpack-plugin');

// These plugin extract modular css and output a minified, bundled css file
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

console.log("Building for [" + process.env.NODE_ENV + "]");

// require our path constants
const paths = require('./constants');

// Entry point for React app
const entry = {
  entry: [
    'babel-polyfill',
    // entry point of our app
    path.join(paths.SRC, 'index.js'),
  ],
};

// Output for bundle file
const output = {
  // the output bundle
  filename: 'app.bundle.js',
  // target directory
  path: paths.DIST,
  // htmlWebPackPlugin will prepend / to the urls of injects
  // this is required so that express will look for the bundled files at the absolute path root of dist rather than at current url
  publicPath: '/',
};

module.exports = {
  entry,
  output,
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      // Minifies production code
      new UglifyJSPlugin({
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.(css|sass|scss)$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  // Plugins for production optimizations: https://webpack.js.org/guides/production/
  plugins: [
    new HtmlWebpackPlugin({
      title: 'production',
      // tack a hash on the end of filenames to enable cache busting
      hash: true,
      // favicon: path.join(paths.IMG, <favicon-filename>),
      // this is the template that the target is crafted from
      template: path.join(paths.SRC, 'index.html'),
      // // drop script tags at the bottom of the body
      // inject: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'style.bundle.css',
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    // vary the distribution of chunk ids to get the smallest id length for often used ids
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
  // configure loaders
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      /**
       * Below we have two rules for .css/.scss files
       * First is for modular / scoped styles
       * Second is for global styles / non-scoped
       *  (i.e. codemirror / package style libs)
       */
      {
        test: /.(css|scss)$/,
        // exclude non-modular style files
        exclude: [paths.GLOBAL_STYLES[0], /node_modules/],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            // these options are required for css-modules
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 2,
              // this is the unique name given to scoped style classes
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          // this loader is required to load relative file paths 
          //  used within @imports (i.e. fonts using url(...))
          'resolve-url-loader',
          // resolve-url-loader requires sourceMap to be enabled
          //  for url path resolution
          'sass-loader?sourceMap'
        ],
      },
      {
        test: /.(css|scss)$/,
        include: paths.GLOBAL_STYLES,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          // this loader is required to load relative file paths 
          //  used within @imports (i.e. fonts using url(...))
          'resolve-url-loader',
          // resolve-url-loader requires sourceMap to be enabled
          //  for url path resolution
          'sass-loader?sourceMap'
        ],
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg|ico)$/,
        use: [
          {
            // loads files as base64 encoded data url if image file is less than set limit
            loader: 'url-loader',
            options: {
              // if file is greater than the limit (bytes), file-loader is used as fallback
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: ['.js', '.jsx'],
  },
};