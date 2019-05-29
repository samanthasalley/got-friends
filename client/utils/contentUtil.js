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

/**
 * @name srcIsExternal
 * @param {string} src
 * @returns {boolean} whether or not string represents an external (http[s]) path
 */
export const srcIsExternal = src => src.slice(0, 4) === 'http';

/**
 * @name srcIsMailto
 * @param {string} src
 * @returns {boolean} whether or not string represents an external (mailto) path
 */
export const srcIsMailto = src => src.slice(0, 6) === 'mailto';