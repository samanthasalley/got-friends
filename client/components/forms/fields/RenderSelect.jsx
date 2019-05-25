/**
* ************************************
*
* @module  RenderSelect
* @author  boilerplate
* @date    boilerplate
* @description Redux form component to render dropdown (html select) elements with relevant error/warning validation messages
*
* ************************************
*/

// dependencies
import React from 'react';
import PropTypes from 'prop-types';
// styles
import styles from '../../../stylesheets/modules/forms/fields/Select.scss';
// utils
import { errorStyleValidator } from '../validators/styleValidators';

const RenderSelect = ({
  input,
  options,
  label,
  disableSelect,
  customClasses,
  helpText,
  meta: { touched, error, warning },
}) => {
  // assign classes to container div
  const mainClasses = (touched && (error || warning))
    ? [styles.group]
    : [styles.group, styles.bottomMargin];
  // assign classes to select field
  const selectClasses = customClasses
    ? customClasses.reduce((acc, cur) => {
      if (styles[cur]) acc.push(styles[cur]);
      return acc;
    }, [])
    : [];
  // get style based on error or warning.
  const { inputErrorClass, errorTextClass, errorText } = errorStyleValidator(touched, error, warning);
  // assign styles based on error, warning, disabled status
  if (inputErrorClass) selectClasses.push(inputErrorClass);
  else if (disableSelect) selectClasses.push(styles.disabled);

  return (
    <div className={mainClasses.join(' ')}>
      {label && <label>{label}</label>}
      {helpText && <div className={styles.help}><small>{helpText}</small></div>}
      <div className={styles.container}>
        <div className={styles.background}>
          <select {...input} disabled={disableSelect || false} className={selectClasses.join(' ')}>
            {options}
          </select>
        </div>
      </div>
      {errorText && <div className={errorTextClass}>{errorText}</div>}
    </div>
  )
};

RenderSelect.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
  label: PropTypes.string,
  options: PropTypes.array,
  helpText: PropTypes.string,
  disableSelect: PropTypes.bool,
  customClasses: PropTypes.array,
};

export default RenderSelect;
