/**
 * ************************************
 *
 * @module  contentUtil
 * @author  boilerplate
 * @date    boilerplate
 * @description Reusable utilities for yaml object parsing
 *
 * ************************************
 */

/**
 * scrubScriptTags
 * @param {str} str
 * @returns {str} input string stripped of any <script></script> tags
 *  this includes stripping out any content between the tags
 */
export const scrubScriptTags = str => str.replace(/<script.*>.*<\/script>/gi, '');

/**
 * @name capitalizeFirstLetter
 * @param {string} str 
 * @returns {string} with str param first letter capitalized
 *                   (i.e. str = 'hello' => 'Hello')
 */
export const capitalizeFirstLetter = str => (str.slice(0, 1).toUpperCase() + str.slice(1));