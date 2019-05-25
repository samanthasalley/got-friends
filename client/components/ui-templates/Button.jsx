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
// styles
import styles from '../../stylesheets/modules/ui-templates/Button.scss';

const Button = props => {
  const { children, type, theme, classes, handleClick, handleEnter, handleExit, disabled, btnProps, activeTab } = props;
  // create btnStyle string with all classes including theme and 
  //  any other prop classes as long as they exist in stylesheet
  let btnStyles = [styles[theme]];
  // verify each extra class is a valid class in our stylesheet 
  //  and if so, add it to our btnStyles arr
  if (classes) classes.forEach(c => styles[c] ? btnStyle.push(styles[c]) : null);
  // Helper function for applying the active classes for each tab
  const getTabStyle = (activeTab, id) => {
    return activeTab === id ? styles.activeTab : '';
  }

  return (
    <button
      {...btnProps}
      type={type ? type : ''}
      className={`${btnStyles} ${theme === 'tab' ? getTabStyle(activeTab, btnProps.id) : ''}`}
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
    'blue', 'blueMedium', 'blueLarge', 'dark', 'floatingNav', 'light', 'link', 'darkLink', 'tab', 'tracker', 'activeTracker', 'actveTab', 'transparent', 'transparentGreen',
  ]).isRequired,
  type: PropTypes.string, // for setting 'submit' on form buttons
  classes: PropTypes.arrayOf(PropTypes.string), // additional class(es) to add
  disabled: PropTypes.bool, // optionally pass disabled bool
  btnProps: PropTypes.object, // any additional btn attrs (i.e. id)
  activeTab: PropTypes.number,
  handleExit: PropTypes.func, // invoked on button hover exit
  handleEnter: PropTypes.func, // invoked on button hover
  handleClick: PropTypes.func, // invoked on button click
};

export default Button;