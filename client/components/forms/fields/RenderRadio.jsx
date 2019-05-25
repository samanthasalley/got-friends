/**
 * ************************************
 *
 * @module  RenderRadio
 * @author  boilerplate
 * @date    boilerplate
 * @description Redux form component to render single radio button 
 *              element with relevant error/warning validation messages
 *
 * ************************************
 */

// dependencies
import React from 'react';
import PropTypes from 'prop-types';
// styles
import styles from '../../../stylesheets/modules/forms/fields/RenderRadio.scss';

const RenderRadio = ({
  input,
  label,
  value,
  meta: { touched, error, warning },
}) => {
  return (
    <div className={styles.radioContainer}>
      <label key={value}>
        {label}
        <input
          type="radio"
          {...input}
          value={value}
          checked={input.value}
          onChange={input.onChange}
        />
        <div className={styles.check}></div>
      </label>
      {touched &&
        ((error && <span className="form-tooltip error">{error}</span>) ||
          (warning && <span className="form-tooltip warning">{warning}</span>))}
    </div>
  )
}

RenderRadio.propTypes = {
  label: PropTypes.any.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  meta: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
};

export default RenderRadio;
