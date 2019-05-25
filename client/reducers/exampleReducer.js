/**
 * ************************************
 *
 * @module  exampleReducer
 * @author  boilerplate
 * @date    boilerplate
 * @description Template reducer can be used as basis for new reducers
 *
 * ************************************
 */

import update from 'immutability-helper';
import actionTypes from '../actions/actionTypes';

const initialState = {
  someData: null,
  flash: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_EXAMPLE_DATA:
      return Object.assign({}, state, action.payload);
    case actionTypes.UPDATE_EXAMPLE_DATA:
      return update(state, { $merge: action.payload });
    case actionTypes.RESET_EXAMPLE_DATA:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
