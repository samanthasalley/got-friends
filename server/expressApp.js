/**
 * ************************************
 *
 * @module  expressApp
 * @author  boilerplate
 * @date    boilerplate
 * @description main express app
 * 
 * ************************************
 */

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const pgPool = require('./models/pgdbmodel');
const passport = require('passport');
const crypto = require('crypto');
const config = require('config');
const flash = require('req-flash');
const moment = require('moment');

const exampleRouter = require('./routes/exampleRouter');

const app = express();

// session logic
const secret = config.get('session-secret');
const sessionConfig = {
  secret,
  name: 'got-friends',
  resave: false, // only resave session if changes are made to session
  saveUninitialized: false, // only create sessions for users who log in
  store: new pgSession({ pool: pgPool }), // store user session data in database
  cookie: { secure: true, maxAge: 14 * 24 * 60 * 60 * 1000 } // 14 day session
};

// settings/configs specific to development
if (process.env.NODE_ENV === 'development') {
  console.log('in development mode');

  sessionConfig.cookie.secure = false; // set cookies on http for dev
  
  // Allow cors only on development
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
}

// let express know that we're sitting behind a proxy server (the AWS load balancer)
// that's handling http -> https redirects
app.set('trust proxy', true);

// server log middleware
app.use(logger(':date[clf] :method :url :status :response-time ms - :res[content-length]'));

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

// parse request body and cookies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(secret));
app.use(flash({ locals: 'flash' }));
app.use(express.static('dist'));

// serve static pages (i.e. cookies policy / t&c)
app.use('/public', express.static(path.join(__dirname, './public')));

// add skip prop to res.locals for setting mw skip flags
app.use((req, res, next) => {
  res.locals.skip = {};
  return next();
});

// begin routes
app.use('/example', exampleRouter);

// serve robots.txt file
app.get('/robots.txt', (req, res) => {
  res.sendFile(path.join(__dirname, '../robots.txt'));
});

// serve main html for React app
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/**
 * express.next(err) error handler
 *  -> passing arg to next is caught by 
 *     expressApp next error handler mw
 * NOTE: this is the best practice way for 
 *       handling error responses in express
 * see: https://expressjs.com/en/guide/error-handling.html
 */
app.use(function (err, req, res, next) {
  // set locals, exclusing error if in production
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};

  // server-log error details
  console.log(`${moment()}: ERROR: next error returned from ${err.location}`);
  console.error(`ERROR DETAILS: `, typeof err === 'object' ? JSON.stringify(err) : err);

  // close request with error response
  return res.status(err.status || 500).json({
    success: false,
    flash: { ...res.locals.flash },
    err: {
      message: res.locals.message,
      error: res.locals.error
    }
  });
});

module.exports = app;
