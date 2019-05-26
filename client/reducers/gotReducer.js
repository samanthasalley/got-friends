/**
 * ************************************
 *
 * @module  gotReducer
 * @author  samanthasalley
 * @date    2019-05-25
 * @description Reducer for storing GoT data
 *
 * ************************************
 */

import update from 'immutability-helper';
import actionTypes from '../actions/actionTypes';

const initialState = {
  fetchedData: null,
  houses: null,
  regions: null,
  seasons: null,
  characters: null, 
};

const gotReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_GOT_DATA:
      return Object.assign({}, state, action.payload);
    case actionTypes.UPDATE_GOT_DATA:
      return update(state, { $merge: action.payload });
    case actionTypes.RESET_GOT_DATA:
      return initialState;
    default:
      return state;
  }
};

export default gotReducer;
