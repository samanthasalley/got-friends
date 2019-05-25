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
// forms
import ExampleFormContainer from './components/forms/containers/ExampleFormContainer';
// utils
import ScrollToTop from './components/utils/ScrollToTop';
import ModalWrapper from './components/utils/ModalWrapper';
import ModalSwitcher from './components/utils/ModalSwitcher';
// other containers / components
import Navbar from './components/navigation/Navbar';
import Footer from './components/Footer';
import FlashContainer from './components/notifications/FlashContainer';

// styles / assets
import styles from './stylesheets/modules/App.scss';


// eslint-disable-next-line no-unused-vars
const App = props => (
  <div className={styles.app}>
    <FlashContainer />
    <ModalWrapper />
    <Navbar />
    <Route component={ScrollToTop} />
    {/* Switch will go to first matching route and mount either learn-start or authed csx path */}
    <Switch>
      {/* === Public routes === */}
      <Route exact path="/" component={Home} />
      <Route exact path="/example-form" component={ExampleFormContainer} />
      <Route exact path="/example-modal" component={() => (
        <ModalSwitcher render={modalProps => (
          <Home {...modalProps} />
        )} />
      )} />
      {/* === Private routes === */}
      {/* NOTE: Not working without auth logic setup */}
      {/* <PrivateRoute exact path="/example-private-route" component={Home} /> */}
      <Route component={NotFound} />
    </Switch>
    <Footer />
  </div>
);

export default withRouter(App);
