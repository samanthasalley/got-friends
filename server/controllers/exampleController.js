/**
 * ************************************
 *
 * @module  exampleController
 * @author  boilerplate
 * @date    boilerplate
 * @description
 *
 * exampleController to be used as a template for creating controllers
 *
 * ************************************
 */

const config = require('config');
const { asyncDbQuery } = require('../util/queryUtil');

const exampleController = {};

// example db query middleware
exampleController.dbQueryExample = async (req, res, next) => {
  // example of using skip flag to skip this middleware
  if (res.locals.skip.dbQueryExample) return next();
  // express next error invocation with custom error details
  //  -> see next error handler function in server/expressApp.js
  if (!req.body.email) {
    return next({
      err: 'No email in req.body',
      status: 400,
      message: 'Invalid request',
      location: 'exampleController.dbQueryExample',
    });
  }
  // example db query using query util
  const query = 'SELECT * FROM people;';

  const queryResult = await asyncDbQuery(query);

  // error handler
  if (!queryResult.ok) {
    return next({
      err: {
        msg: 'Error returned from DB query.',
        dbErr: queryResult.err,
      },
      status: 400,
      message: 'An error occurred',
      location: 'exampleController.dbQueryExample - asyncDbQuery error handler'
    });
  }

  // success handler
  res.locals.people = queryResult.data.rows;
};

module.exports = exampleController;
