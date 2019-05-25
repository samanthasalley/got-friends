'use strict';

/**
 * ************************************
 *
 * @module  formatUtil
 * @author  boilerplate
 * @date    boilerplate
 * @description util for reusable formatting helper functions
 * 
 * ************************************
 */

const formatUtil = {};

/**
 * @name formatUtil.objAllIdsById
 * @param {string} idProp
 * @param {array} data array of objects
 * @param {boolean} lowercase whether or not to lowercase the id
 * @requires data objects to all have an idProp property
 * @description reduces data param to object of specific shape
 *              using the idProp param as the key for each obj
 * @returns {obj} formatted as { allIds: [], byId: {} }
 */
formatUtil.objAllIdsById = (idProp, data, lowercase = false) => {
  return data.reduce((formatted, cur) => {
    if (lowercase) {
      formatted.allIds.push(cur[idProp].toLowerCase());
      formatted.byId[cur[idProp].toLowerCase()] = cur;
    }
    else {
      formatted.allIds.push(cur[idProp]);
      formatted.byId[cur[idProp]] = cur;
    }
    return formatted;
  }, { allIds: [], byId: {} });
};

module.exports = formatUtil;