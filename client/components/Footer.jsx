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
import { withRouter, Link } from 'react-router-dom';
// styles / assets
import styles from '../stylesheets/modules/Footer.scss';

const Footer = (props) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        {/* insert logo image here */}
      </div>
      <div className={styles.columns}>
        <section>
          <ul>
            <li><strong>Example Section 1</strong></li>
            <li><Link to="/">Example Link 1</Link></li>
          </ul>
        </section>
        <section>
          <ul>
            <li><strong>Example Section 2</strong></li>
            <li><Link to="/">Example Link 2</Link></li>
          </ul>
        </section>
        <section>
          <ul>
            <li><strong>Example Section 3</strong></li>
            <li><Link to="/">Example Link 3</Link></li>
          </ul>
        </section>
      </div>
      <section>
        <div className={styles.address}>
          <h2>Example Column 3</h2>
        </div>
      </section>
      <p className={styles.copyright}>
        &copy; All Rights Reserved.
        <a href="/" target="_blank">Terms and Conditions</a>
        <a href="/" target="_blank">Privacy Policy</a>
      </p>
    </footer>
  );
}

export default withRouter(Footer);
