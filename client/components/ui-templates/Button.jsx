/**
 * ************************************
 *
 * @module  Button
 * @author  boilerplate
 * @date    boilerplate
 * @description  Renders button with approved button type
 *
 * ************************************
 */

// dependencies
import React from 'react';
import PropTypes from 'prop-types';
import createClassString from '../../utils/createClassString';
// styles
import styles from '../../stylesheets/modules/ui-templates/Button.scss';

const Button = props => {
  const { children, type, theme, size, color, btnStyles, handleClick, handleEnter, handleExit, disabled, btnProps, activeTab } = props;
  // create btnStyle string with all classes including theme and 
  //  any other prop classes as long as they exist in stylesheet
  const classesToCheck = btnStyles ? [theme, size, ...btnStyles] : [theme, size];
  if (color) classesToCheck.push(color);
  const btnClassString = createClassString(classesToCheck, styles);

  return (
    <button
      {...btnProps}
      type={type ? type : ''}
      className={btnClassString}
      onClick={handleClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleExit}
      disabled={disabled ? disabled : false}>
      {children}
    </button>
  );
};

Button.propTypes = {
  theme: PropTypes.oneOf([ // styled button options
    'btn', 'link',
  ]).isRequired,
  theme: PropTypes.oneOf([ // button size options
    'sm', 'md', 'lg',
  ]).isRequired,
  color: PropTypes.oneOf([ // button color options
    'blue', 'dark', 'light', 'transparent'
  ]),
  type: PropTypes.string, // for setting 'submit' on form buttons
  btnStyles: PropTypes.arrayOf(PropTypes.string), // additional class(es) to add
  disabled: PropTypes.bool, // optionally pass disabled bool
  btnProps: PropTypes.object, // any additional btn attrs (i.e. id)
  activeTab: PropTypes.number,
  handleExit: PropTypes.func, // invoked on button hover exit
  handleEnter: PropTypes.func, // invoked on button hover
  handleClick: PropTypes.func, // invoked on button click
};

export default Button;