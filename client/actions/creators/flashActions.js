/**
 * ************************************
 *
 * @module  flashActions
 * @author  boilerplate
 * @date    boilerplate
 * @description Actions that deal with flash messages
 *
 * ************************************
 */
import actionTypes from '../actionTypes';

/**
 * @description handles setting flash message client-side
 * @param {object} flashObj should be in following format:
 *   { "error": ['error 1', 'error 2' ...] }
 *   OR { "success": ['success 1', 'success 2' ...] }
 *   OR { "info": ['info 1', 'info 2' ...] }
 */
export const addUserFlashMsg = flashObj => ({
  type: actionTypes.UPDATE_FLASH_MESSAGE,
  payload: flashObj,
});

export const hideFlash = flash => ({
  type: actionTypes.UPDATE_FLASH_STATUS,
  flashType: flash.flashType,
  arrIndex: flash.arrIndex,
  status: flash.status,
});

export const clearFlash = () => ({
  type: actionTypes.CLEAR_FLASH_STATUS,
});
