/**
 * ************************************
 *
 * @module  NavbarDrawer
 * @author  boilerplate
 * @date    boilerplate
 * @description Main navbar mobile view -> can add subset of navbar items for mobile
 *
 * ************************************
 */

// dependencies
import React from 'react';
// components
import NavLink from './NavLink';
// styles
import styles from '../../stylesheets/modules/navigation/NavbarDrawer.scss';

const NavbarDrawer = (props) => {

  return (
    <div className={styles.drawer} onClick={props.toggleNav} style={{ transform: `translateY(${props.open ? 0 : -100}%)`, visibility: props.open ? 'visible' : 'hidden' }}>
      <NavLink route="/" title="Example Drawer Link" />
    </div>
  )
}

export default NavbarDrawer;
