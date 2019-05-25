/**
 * ************************************
 *
 * @module  reactGA.js
 * @author  boilerplate
 * @date    boilerplate
 * @description Util for creating a React Google-Analytics singleton
 * 
 * ************************************
 */

import ReactGA from 'react-ga';
import googleAnalyticsId from 'config';

let instance = null;

const getReactGAInstance = () => {
  if (instance) {
    return instance;
  }
  instance = ReactGA;
  instance.initialize(googleAnalyticsId, { debug: true });
  return instance;
};
export const ReactGAInstance = getReactGAInstance();
