/**
 * ************************************
 *
 * @module  flashReducer
 * @author  boilerplate
 * @date    boilerplate
 * @description Keeps track of application-level client-side flash status,
 * currently only keeps track of hidden flash messages since server-side flash is in user.flash
 * 
 * TODO: can we update flash messages to only go through flashReducer? 
 *       -> Why the need for separation between client- and server- side flash messages?
 *
 * ************************************
 */
import update from 'immutability-helper';
import actionTypes from '../actions/actionTypes';

const initialState = {
  error: [],
  success: [],
  info: [],
  flash: {},
};

const flashReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_FLASH_MESSAGE:
      return update(state, { flash: { $set: action.payload.flash } });
    case actionTypes.UPDATE_FLASH_STATUS:
      // Updates one specific flash message's status
      return update(state, { [action.flashType]: { [action.arrIndex]: { $set: action.status } } });
    case actionTypes.CLEAR_FLASH_STATUS:
      return initialState;
    default:
      return state;
  }
};

export default flashReducer;
