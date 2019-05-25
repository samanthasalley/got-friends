
/**
 * ************************************
 *
 * @module  modalActions
 * @author  boilerplate
 * @date    boilerplate
 * @description Actions that deal with modal content and status
 *
 * ************************************
 */

import actionTypes from '../actionTypes';

export const showModal = (modalContent, modalName) => ({
  type: actionTypes.SHOW_MODAL,
  payload: {
    content: modalContent,
    name: modalName
  }
});
  
export const hideModal = () => ({
  type: actionTypes.HIDE_MODAL,
});
  
export const updateModalContent = (newModalContent, newModalName) => ({
  type: actionTypes.UPDATE_MODAL_CONTENT,
  payload: {
    content: newModalContent,
    name: newModalName
  }
});