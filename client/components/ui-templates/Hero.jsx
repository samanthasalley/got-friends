/**
 * ************************************
 *
 * @module  Hero
 * @author  boilerplate
 * @date    boilerplate
 * @description Renders background image with overlay and text
 *
 * ************************************
 */

// dependencies
import React from 'react';
import PropTypes from 'prop-types';
// styles
import styles from '../../stylesheets/modules/ui-templates/Hero.scss';

const Hero = ({ styleOverride, backgroundImage, children }) => (
  <div
    className={styles.hero}
    style={{ ...styleOverride, backgroundImage: `url(${backgroundImage})` }}
  >
    <div className={styles.container}>
      {children}
    </div>
  </div>
);

Hero.propTypes = {
  backgroundImage: PropTypes.string.isRequired,
  styleOverride: PropTypes.object,
};

Hero.defaultProps = {
  styleOverride: {},
};

export default Hero;
