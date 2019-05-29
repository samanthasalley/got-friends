/**
 * ************************************
 *
 * @module  validators
 * @author  boilerplate
 * @date    08/28/18
 * @description Validation helper functions for redux-form
 *
 * ************************************
 */

export const required = (value) => (value && value !== '') ? undefined : 'Required';

/** 
 * =========================================
 * curried fns to check dynamic props
 * see here for best practice documentation:
 * https://github.com/erikras/redux-form/issues/2453#issuecomment-272483784 
 * =========================================
 */

/** Checks value is exactly x chars (i.e. state 2 chars) */
export const exactLength = len => value =>
  value && value.length > len ? `Must be exactly ${len} characters` : undefined;

/** Checks valus is at most x chars */
export const maxLength = max => value => 
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

/** validate greater than x (for payment) */
export const minVal = (min, err) => value => value && parseFloat(value) <= min ? err : undefined;


/**
 * ===========================
 * Basic redux-form validators
 * ===========================
 */

// /** Checks email exists and is valid email format */
// export const emailValidator = (value) => {
//   const emailRules = new RegExp(config["email-config"].rules, "i");
//   const emailErrorMsg = config["email-config"].errorMessage;

//   let error;

//   if (value && !emailRules.test(value)) error = emailErrorMsg;

//   return error;
// };

// /** Checks password is valid pw format */
// export const passwordValidator = (value) => {
//   const passwordRules = new RegExp(config["password-config"].rules);
//   const passwordErrorMsg = config["password-config"].errorMessage;

//   let error;

//   if (value && !passwordRules.test(value)) error = passwordErrorMsg;

//   return error;
// };

// /** Tests a string for common phone number characters, allowing numbers, parens, pluses, and hyphens */
// // doesnt check for required
// export const phoneNumberValidator = (value) => {
//   const phoneRules = new RegExp(config.phoneConfig.rules, "i");
//   const phoneErrorMsg = config.phoneConfig.errorMessage;

//   let error;

//   if (value && !phoneRules.test(value)) error = phoneErrorMsg;

//   return error;
// };