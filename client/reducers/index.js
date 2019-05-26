/**
 * ************************************
 *
 * @module  index
 * @author  boilerplate
 * @date    boilerplate
 * @description simply a place to combine reducers
 * 
 * NOTE: includes example for using redux-form plugin to override redux-form state
 *
 * ************************************
 */

import { combineReducers } from 'redux';
// Reducers
import { reducer as formReducer } from 'redux-form';
import gotReducer from './gotReducer';
import modalReducer from './modalReducer';
// Action types (for redux-form plugin)
// import { CLEAR_EXAMPLE_FORM } from '../actions/actionTypes';

// Combine reducers
const reducers = combineReducers({
  /**
   * @description use this plugin to clear form on specific actions
   *              -> currently using to clear app form on submission
   * @see https://redux-form.com/7.2.0/docs/faq/howtoclear.md/
   * form: formReducer.plugin({
   *   switch(action.type) {
   *     exampleForm: (state, action) => {
   *       case CLEAR_EXAMPLE_FORM:
   *         return undefined;
   *       default:
   *         return state;
   *     }
   *   },
   * }),
   */
  /* if no redux-form plugins are needed, use this default reducer */
  form: formReducer,
  // custom reducers
  data: gotReducer,
  modal: modalReducer,
});

export default reducers;
