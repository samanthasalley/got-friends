const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

// On build runs, this plugin will create an index.html file in the dist directory that
// adds css and bundle files into the index.html template defined below under 'plugins'
const HtmlWebpackPlugin = require('html-webpack-plugin');

// This plugin extracts modular css and outputs a bundled css file
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


console.log("Building for [" + process.env.NODE_ENV + "]");

// set up our path constants
const paths = {
  DIST: path.resolve(__dirname, '../dist'),
  SRC: path.resolve(__dirname, '../client'),
  IMG: path.resolve(__dirname, '../client/assets'),
  UTIL: path.resolve(__dirname, '../utilities'),
  GLOBAL_STYLES: [ // needed to load any node_modules styles and/or global sass styles
    path.resolve(__dirname, '../client/stylesheets/global/style.scss'),
  ],
  SCOPED_STYLES: path.resolve(__dirname, '../client/stylesheets/modules/')
};

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
  // Plugins for production optimizations: https://webpack.js.org/guides/production/
  plugins: [
    new HtmlWebpackPlugin({
      title: 'production',
      // tack a hash on the end of filenames to enable cache busting
      hash: true,
      // favicon: path.join(paths.IMG, '<favicon-url>'), // TODO: add favicon back
      // this is the template that the target is crafted from
      template: path.join(paths.SRC, 'index.html'),
      // drop script tags at the bottom of the body
      inject: true,
    }),
    // After webpack rebuilds bundle, webpack-dev-middleware thinks that nothing has changed
    // This is because the changed module representing css has been emptied out by extractTextPlugin
    // disable ExtractTextPlugin in development to let HMR hot load styles
    // disable will cause plugin to fallback to style-loader
    new ExtractTextPlugin({
      filename: 'style.bundle.css',
      allChunks: true,
    }),
    // Minifies production code
    new UglifyJSPlugin({
      sourceMap: true,
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
       */
      {
        test: /.(css|scss)$/,
        // exclude non-modular style files
        exclude: [paths.GLOBAL_STYLES[0], /node_modules/],
        loader: ExtractTextPlugin.extract({
          // fallback to style-loader when css is not extracted
          // style-loader injects the css into the header wrapped in style tags
          fallback: 'style-loader',
          use: [
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
        }),
      },
      {
        test: /.(css|scss)$/,
        include: paths.GLOBAL_STYLES,
        loader: ExtractTextPlugin.extract({
          // fallback to style-loader when css is not extracted
          // style-loader injects the css into the header wrapped in style tags
          fallback: 'style-loader',
          use: [
            'css-loader',
            // this loader is required to load relative file paths 
            //  used within @imports (i.e. fonts using url(...))
            'resolve-url-loader',
            // resolve-url-loader requires sourceMap to be enabled
            //  for url path resolution
            'sass-loader?sourceMap'
          ],
        }),
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg|ico|jpeg)$/,
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