/**
 * ************************************
 *
 * @module  styleValidators
 * @author  prattjoel
 * @date    01/22/19
 * @description Validation helper functions for form styles
 *
 * ************************************
 */
 
import styles from '../../../stylesheets/shared/forms/_validation.scss';

// determine form style if there's an error or warning 
export const errorStyleValidator = (touched, error, warning) => {
  const errorStyle = {};
  
  if (touched && error) {
    errorStyle.inputErrorClass = styles.errorBorder;
    errorStyle.errorTextClass = styles.error;
    errorStyle.errorText = error;
  } else if (touched && warning){
    errorStyle.inputErrorClass = styles.warningBorder;
    errorStyle.errorTextClass = styles.warning;
    errorStyle.errorText = warning;
  } else {
    errorStyle.inputErrorClass = '';
    errorStyle.errorTextClass = '';
    errorStyle.errorText = null;
  }
  
  return errorStyle
}