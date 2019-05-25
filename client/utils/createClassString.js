/* eslint-disable no-prototype-builtins */
/**
 * ************************************
 *
 * @module  createClassString
 * @author  boilerplate
 * @date    boilerplate
 * @description Retrieves class names from styles object and concatentates
 * them into a single string that can be assigned to className attribute
 *
 * ************************************
 */

/**
 * @param {string|string[]} classes - a single class name or array of class names
 * @param {Object} styles - styles object pertaining to related ui-template
 * @returns {string} concatenated class names retrieved from styles object or
 *                   undefined if class names were invalid
 */
const createClassString = function (classes, styles) {
  if (Array.isArray(classes)) {
    // concatenates class names (if they exist in styles object) into string
    const classString = classes.reduce((acc, next) => {
      if (styles.hasOwnProperty(next)) return `${acc} ${styles[next]}`;
      return acc;
    }, '');
    // only return the string if classes were actually added
    return classString.length > 0 ? classString : undefined;
  }
  return styles[classes];
};

export default createClassString;
