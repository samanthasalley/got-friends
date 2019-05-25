/**
 * ************************************
 *
 * @module  errorUtil
 * @author  boilerplate
 * @date    boilerplate
 * @description provides reusable error handler functions
 *
 * ************************************
 */

const moment = require('moment');

export const handleReduxThunkError = (data) => {
  console.log(`${moment()}: Error occurred in redux thunk action ${data.action}`);
  console.log('Error details:', data.err);
};