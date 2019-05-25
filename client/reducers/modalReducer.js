/**
 * ************************************
 *
 * @module  modalReducer
 * @author  boilerplate
 * @date    boilerplate
 * @description handles all modal actions in a reusable reducer
 *
 * ************************************
 */

import update from 'immutability-helper';
import actionTypes from '../actions/actionTypes';

const initialState = {
  visible: false,
  content: {},
  name: null,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_MODAL:
      return Object.assign({}, state, { 
        visible: true, 
        content: action.payload.content, 
        name: action.payload.name 
      });
      break;
    case actionTypes.HIDE_MODAL:
      return Object.assign({}, state, initialState);
      break;
    case actionTypes.UPDATE_MODAL_CONTENT:
      return update(state, { $merge: action.payload });
    default:
      return state;
  }
};

export default modalReducer;