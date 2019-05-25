/**
 * ************************************
 *
 * @module  RenderRadioGroup
 * @author  boilerplate
 * @date    boilerplate
 * @description Redux form component to render group of radio buttons 
 *              with relevant error/warning validation messages
 *
 * ************************************
 */

// dependencies
import React from 'react';
import PropTypes from 'prop-types';
// styles
import styles from '../../../stylesheets/modules/forms/fields/RenderRadio.scss';

const RenderRadioGroup = ({
  input,
  options,
  label,
  meta: { touched, error, warning },
}) => {
  const mainClasses = (touched && (error || warning))
    ? styles.group
    : `${styles.group} ${styles.bottomMargin}`;
  const RadioOptions = options.map(o => {
    return (
      <label key={o.value} className={styles.item}>
        {o.title}
        <input
          type="radio"
          {...input}
          value={o.value}
          checked={o.value == input.value}
          onChange={input.onChange}
        />
        <div className={styles.check}></div>
      </label>
    )
  });
  return (
    <div className={mainClasses}>
      <label>{label}</label>
      <div className={styles.container}>
        {RadioOptions}
      </div>
      {touched &&
        ((error && <div className={styles.error}>{error}</div>) ||
          (warning && <div className={styles.error}>{warning}</div>))}
    </div>
  );
};

RenderRadioGroup.propTypes = {
  options: PropTypes.array.isRequired,
  label: PropTypes.any.isRequired,
};

export default RenderRadioGroup;
