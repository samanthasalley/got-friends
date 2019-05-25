/**
 * ************************************
 *
 * @module  index
 * @author  boilerplate
 * @date    boilerplate
 * @description entry point for react app
 *
 * ************************************
 */
// dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter, Route } from 'react-router-dom';
// components
import App from './App';
import LocationListener from './components/navigation/LocationListener';
// utils
import store from './store';

// import for global styles
import './stylesheets/global/style.scss';

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <LocationListener>
          <AppContainer>
            <Component />
          </AppContainer>
        </LocationListener>
      </BrowserRouter>
    </Provider>,
    document.getElementById('app')
  );
};

render(App);