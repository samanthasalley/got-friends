/**
 * ************************************
 *
 * @module  Header
 * @author  boilerplate
 * @date    boilerplate
 * @description Renders header with custom styles based on props
 *
 * ************************************
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../stylesheets/modules/ui-templates/Header.scss';


const Header = (props) => {
  const { children, size, style } = props;
  return (
    <header>
      {size === 'h1' ?
        <h1 className={styles[style]}>{children}</h1> :
        size === 'h2' ?
          <h2 className={styles[style]}>{children}</h2> :
          size === 'h3' ?
            <h3 className={styles[style]}>{children}</h3> :
            size === 'h4' ?
              <h4 className={styles[style]}>{children}</h4> :
              size === 'h5' ?
                <h5 className={styles[style]}>{children}</h5> :
                size === 'h6' ?
                  <h6 className={styles[style]}>{children}</h6> :
                  null
      }
    </header>
  );
};

Header.propTypes = {
  size: PropTypes.oneOf([
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
  ]).isRequired,
  children: PropTypes.any.isRequired,
};

export default Header;
