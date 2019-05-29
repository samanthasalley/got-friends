/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-first-prop-new-line */
/* eslint-disable react/jsx-max-props-per-line */
/**
 * ************************************
 *
 * @module  App.jsx
 * @author  boilerplate
 * @date    boilerplate
 * @description Main application
 *  -> top-level React-Router Routes
 *  -> Singleton components (FlashContainer, ModalWrapper, Navbar, Footer)
 *
 * ************************************
 */

// dependencies
import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
// navigation
import NotFound from './components/navigation/NotFound';
// pages
import Home from './components/pages/Home';
// utils
import ScrollToTop from './components/utils/ScrollToTop';
// other containers / components
import Footer from './components/Footer';

// styles / assets
import styles from './stylesheets/modules/App.scss';

// eslint-disable-next-line no-unused-vars
const App = props => (
  <div className={styles.app}>
    <Route component={ScrollToTop} />
    <Switch>
      <Route exact path="/" component={Home} />
      {/* If we haven't hit a set path, render 404 page */}
      <Route component={NotFound} />
    </Switch>
    <Footer />
  </div>
);

export default withRouter(App);
