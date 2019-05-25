/**
 * ************************************
 *
 * @module  exampleActions
 * @author  boilerplate
 * @date    boilerplate
 * @description A template to create new modular action files w/ Redux-Thunk middleware example
 *
 * ************************************
 */
import fetch from 'isomorphic-fetch';
import actionTypes from '../actionTypes';
import { handleReduxThunkError } from '../../utils/errorUtil';
import { addUserFlashMsg } from './flashActions';
import { hideModal } from './modalActions';

// action for overwriting data
export const setExampleData = data => ({
  type: actionTypes.SET_EXAMPLE_DATA,
  payload: data,
});

// action to merge new data with existing data
export const updateExampleData = data => ({
  type: actionTypes.UPDATE_EXAMPLE_DATA,
  payload: data,
});

// action to reset data to initialState
export const resetExampleData = data => ({
  type: actionTypes.RESET_EXAMPLE_DATA,
  payload: data,
});

// Thunk middleware will turn async actions into actions
export const exampleGetData = () => dispatch => {
  // This works on webpack dev:hot since proxy is specified in the config
  fetch('/example/', {
    method: 'GET',
    credentials: 'include', // Include cookies
  })
    .then(res => res.json())
    .then(res => {
      const { flash, success, data, err } = res;
      if (flash && flash.keys.length) dispatch(updateExampleData({ flash }));
      if (!success) {
        handleReduxThunkError({ location: 'exampleActions.exampleGetData', err });
        return { success, err };
      }
      dispatch(updateExampleData(data));
      return { success, data };
    })
    .catch(err => {
      handleReduxThunkError({ location: 'exampleActions.exampleGetData', err });
      return err;
    });
};