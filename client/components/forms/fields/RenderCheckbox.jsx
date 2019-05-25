/**
 * ************************************
 *
 * @module  RenderCheckbox
 * @author  boilerplate
 * @date    boilerplate
 * @description Redux form component to render checkbox element with relevant error/warning validation messages
 *
 * ************************************
 */

// dependencies
import React from 'react';
import PropTypes from 'prop-types';
// styles
import styles from '../../../stylesheets/modules/forms/fields/Checkbox.scss';

const RenderCheckbox = ({
  input,
  label,
  checkboxValue,
  meta: { touched, error, warning },
}) => {
  return (
    <div>
      <label className={styles.container}>{label}
        <input type="checkbox"
          /**
           * Redux-Form defaults checkbox values to bool, 
           * but here we can  manually set value in order 
           * to control the value for the checkbox field
           */
          value={checkboxValue}
          checked={input.value}
          /** 
           * onChange should either: 
           *  return the value (if user checked the box) 
           *  OR return false (if user unchecked the box)
           * */
          onChange={e => e.target.checked ? input.onChange(e.target.value) : input.onChange(false)}
        />
        <span className={styles.checkmark}></span>
      </label>
      {touched &&
        ((error && <span className="form-tooltip error">{error}</span>) ||
          (warning && <span className="form-tooltip warning">{warning}</span>))}
    </div>
  )
};

RenderCheckbox.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.any.isRequired,
  checkboxValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  meta: PropTypes.object.isRequired,
};

export default RenderCheckbox;
