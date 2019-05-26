const path = require('path');

// set up our path constants
const paths = {
  DIST: path.resolve(__dirname, '../dist'),
  SRC: path.resolve(__dirname, '../client'),
  IMG: path.resolve(__dirname, '../client/assets'),
  UTIL: path.resolve(__dirname, '../utilities'),
  GLOBAL_STYLES: [ // needed to load codemirror styles and CSX sass styles
    path.resolve(__dirname, '../client/stylesheets/global/style.scss')
  ],
  SCOPED_STYLES: path.resolve(__dirname, '../client/stylesheets/modules/')
};

module.exports = paths;