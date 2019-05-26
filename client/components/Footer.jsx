/**
 * ************************************
 *
 * @module  Footer
 * @author  boilerplate
 * @date    boilerplate
 * @description Footer component that can be used in any top-level component
 *
 * ************************************
 */
// dependencies
import React, { Component } from 'react';
// styles / assets
import styles from '../stylesheets/modules/Footer.scss';

const Footer = (props) => {
  return (
    <footer className={styles.footer}>
      <span>Samantha Salley</span>
      <span>2019</span>
    </footer>
  );
}

export default Footer;
