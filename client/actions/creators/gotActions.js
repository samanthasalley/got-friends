/**
 * ************************************
 *
 * @module  gotActions
 * @author  samanthasalley
 * @date    2019-05-25
 * @description Actions for fetching GoT data from server
 *
 * ************************************
 */
import fetch from 'isomorphic-fetch';
import actionTypes from '../actionTypes';
import { handleReduxThunkError } from '../../utils/errorUtil';

// action for overwriting data
export const setGOTData = data => ({
  type: actionTypes.SET_GOT_DATA,
  payload: data,
});

// action to merge new data with existing data
export const updateGOTData = data => ({
  type: actionTypes.UPDATE_GOT_DATA,
  payload: data,
});

// action to reset data to initialState
export const resetGOTData = data => ({
  type: actionTypes.RESET_GOT_DATA,
  payload: data,
});

// Thunk middleware will turn async actions into actions
export const fetchData = () => dispatch => {
  // This works on webpack dev:hot since proxy is specified in the config
  fetch('/got/', {
    method: 'GET',
    credentials: 'include', // Include cookies
  })
    .then(res => res.json())
    .then(res => {
      const { success, data, err } = res;
      if (!success) {
        handleReduxThunkError({ location: 'gotActions.fetchData', err });
        return { success, err };
      }
      dispatch(updateGOTData(data));
      return { success, data };
    })
    .catch(err => {
      handleReduxThunkError({ location: 'gotActions.fetchData', err });
      return err;
    });
};