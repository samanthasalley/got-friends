/**
 * ************************************
 *
 * @module  RenderField
 * @author  boilerplate
 * @date    boilerplate
 * @description Redux form component to render input elements with relevant error/warning validation messages
 *
 * ************************************
 */
import React from 'react';
import PropTypes from 'prop-types';
// styles
import styles from '../../../stylesheets/modules/forms/fields/RenderField.scss';
// utils
import { errorStyleValidator } from '../validators/styleValidators';

const RenderField = ({
  input,
  label,
  type,
  placeholder,
  inline,
  customClasses,
  disableInput,
  helpText,
  meta: { touched, error, warning },
}) => {
  const mainClasses = (touched && (error || warning))
    // add regular .group class to enable override in special components (i.e. person acquisition)
    ? []
    : [styles.bottomMargin];
  if (!inline) mainClasses.push(styles.group);

  // assign style based on error or warning.
  const { inputErrorClass, errorTextClass, errorText } = errorStyleValidator(touched, error, warning);
  const inputClasses = customClasses
    ? customClasses.reduce((acc, cur) => {
      if (styles[cur]) acc.push(styles[cur]);
      return acc;
    }, [])
    : [];
  if (inputErrorClass) inputClasses.push(inputErrorClass);
  else if (disableInput) inputClasses.push(styles.disabled);
  if (input.customClasses) inputClasses.push('input'); // add global class here as identifier for customClasses to use
  return (
    <div className={mainClasses.join(' ')}>
      {label && <label>{label}</label>}
      {helpText && <div className={styles.help}><small>{helpText}</small></div>}
      <input {...input}
        placeholder={placeholder}
        type={type}
        disabled={disableInput || false}
        className={inputClasses.join(' ')}
      />
      {errorText && <div className={errorTextClass}>{errorText}</div>}
    </div>
  )
};

RenderField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
  type: PropTypes.string,
  inline: PropTypes.bool,
  label: PropTypes.string,
  helpText: PropTypes.string,
  disableInput: PropTypes.bool,
  placeholder: PropTypes.string,
  customClasses: PropTypes.array,
};

export default RenderField;
