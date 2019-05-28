/**
 * ************************************
 *
 * @module  randomColorUtil
 * @author  samanthasalley
 * @date    2019-05-28
 * @description Helper functions utilizing randomcolor npm package
 * @see https://www.npmjs.com/package/randomcolor
 *
 * ************************************
 */
import randomColor from 'randomcolor';

/**
 * @name generateRandomColorPalette
 * @param {object} details
 * @param {number} attempt default: 0
 * @description recursively tries to use randomcolor module to 
 *              generate one (or more) random colors, up to 4 times
 * @returns {array} of strings if details.count is greater than 1
 * @returns {string} if details.count is 1 or undefined
 * @returns {boolean} false if recursive tries fail 4 times
 */
export const generateRandomColorPalette = (details = {}, attempt = 0) => {
  try {
    return randomColor({ ...details });
  }
  catch (e) {
    if (attempt > 3) return false;
    const newDeets = { ...details };
    delete newDeets.hue;
    if (details.count && details.count === 1) delete newDeets.count;
    return generateRandomColorPalette(newDeets, attempt + 1);
  }
};