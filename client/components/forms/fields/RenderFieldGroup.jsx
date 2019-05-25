/**
 * ************************************
 *
 * @module  RenderFieldGroup
 * @author  boilerplate
 * @date    boilerplate
 * @description Redux form component to render group of radio buttons or checkboxes with relevant error/warning validation messages
 *
 * ************************************
 */

// dependencies
import React from 'react';
import PropTypes from 'prop-types';
// styles
import styles from '../../../stylesheets/modules/forms/fields/Select.scss';

const RenderFieldGroup = ({
  input,
  options,
  label,
  type,
  meta: { touched, error, warning },
}) => (
    <div className={styles.select}>
      <label>{label}</label>
      {options.map(o => <label key={o.value}><input type={type} {...input} value={o.value} checked={o.value === input.value} {...o.optionProps} /> {o.label}</label>)}
      {touched &&
        ((error && <span style={{ paddingLeft: '5px', textAlign: 'left', position: 'absolute', top: '54px', color: 'red', fontSize: '1.2rem' }}>{error}</span>) ||
          (warning && <span style={{ paddingLeft: '5px', textAlign: 'left', position: 'absolute', top: '54px', color: 'orange', fontSize: '1.2rem' }}>{warning}</span>))}
    </div>
  );

RenderFieldGroup.propTypes = {
  type: PropTypes.oneOf([
    'radio', 'checkbox'
  ]).isRequired,
  options: PropTypes.array.isRequired,
};

export default RenderFieldGroup;
