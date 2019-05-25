// NOTE: With webpack dev server w/hot-reload, there is potential for stale network requests
// and stale redux store data to get "revived" from disk cache
// ex: user logs in, browses through gated content, signs out
// Upon backing out from browser history and going forward,
// the cached app displays gated content as if user was still signed in.

// When in doubt, check by building and running the application without webpack dev server

const webpack = require('webpack');
const path = require('path');

// required to add client configs to build
const fs = require('fs');

// On build runs, this plugin will create an index.html file in the dist directory that
// adds css and bundle files into the index.html template defined below under 'plugins'
const HtmlWebpackPlugin = require('html-webpack-plugin');

// This plugin extracts modular css and outputs a bundled css file
const ExtractTextPlugin = require('extract-text-webpack-plugin');

console.log("Building for [" + process.env.NODE_ENV + "]");

// set up our path constants
const paths = {
  DIST: path.resolve(__dirname, '../dist'),
  SRC: path.resolve(__dirname, '../client'),
  IMG: path.resolve(__dirname, '../client/assets'),
  UTIL: path.resolve(__dirname, '../utilities'),
  GLOBAL_STYLES: [ // needed to load any node_modules styles and/or global sass styles
    path.resolve(__dirname, '../client/stylesheets/global/style.scss')
  ],
  SCOPED_STYLES: path.resolve(__dirname, '../client/stylesheets/modules/')
};

// Entry point for React app
const entry = {
  entry: [
    'babel-polyfill',

    // activate HMR for React
    'react-hot-loader/patch',

    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    'webpack-dev-server/client?http://localhost:8080',

    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    'webpack/hot/only-dev-server',

    // entry point of our app
    path.join(paths.SRC, 'index.js')
  ]
};

// Output for bundle file
const output = {
  // target directory
  path: paths.DIST,

  // the output bundle
  filename: 'app.bundle.js',

  // necessary for HMR to know where to load the hot update chunks
  publicPath: '/',

};


module.exports = {
  entry,
  output,
  // set up our source map
  devtool: 'eval-source-map',

  // Configure the webpack-dev-server
  devServer: {
    // Required for Docker to work with dev server
    host: '0.0.0.0',
    port: 8080,
    // match the output path
    contentBase: paths.DIST,
    //enable HMR on the devServer
    hot: true,
    //match the output 'publicPath'
    publicPath: '/',
    // fallback to root for other urls
    historyApiFallback: true,

    inline: true,

    headers: { 'Access-Control-Allow-Origin': '*' },
    // proxy is required in order to make api calls to express server while using hot-reload webpack server
    // routes api fetch requests from localhost:8080/api/* (webpack dev server) to localhost:3000/api/* (where our Express server is running)
    proxy: {
      '/assets/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
      '/users/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
      '/public/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
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
      disable: process.env.NODE_ENV !== 'production',
    }),
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),
    // this prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin()

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
  }
};
