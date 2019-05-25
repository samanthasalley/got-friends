/**
* ************************************
*
* @module  RenderTextarea
* @author  boilerplate
* @date    boilerplate
* @description Redux form component to render textarea elements  
*              with relevant error/warning validation messages
*
* ************************************
*/

// dependencies
import React from 'react';
import PropTypes from 'prop-types';
// styles
import styles from '../../../stylesheets/modules/forms/fields/RenderTextarea.scss';
// utils
import { errorStyleValidator } from '../validators/styleValidators';

const RenderTextarea = ({
  input,
  label,
  meta: { touched, error, warning },
}) => {

  const mainClasses = (touched && (error || warning))
    ? styles.group
    : `${styles.group} ${styles.bottomMargin}`;

  // assign style based on error or warning.
  const { inputErrorClass, errorTextClass, errorText } = errorStyleValidator(touched, error, warning);

  return (
    <div className={mainClasses}>
      <label>{label}</label>
      <textarea {...input} className={inputErrorClass} />
      {errorText && <div className={errorTextClass}>{errorText}</div>}
    </div>
  )
};

RenderTextarea.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.any.isRequired,
};

export default RenderTextarea;
