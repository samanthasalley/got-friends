/**
 * ************************************
 *
 * @module  LocationListener
 * @author  boilerplate
 * @date    boilerplate
 * @description Application wrapper for tracking React-Router page changes in Google-Analytics
 * 
 * ************************************
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { ReactGAInstance } from '../../utils/google-analytics/reactGA';

class LocationListener extends Component {
  constructor(props) {
    super(props);
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  /**
   * @name handleLocationChange
   * @description function for tracking React-Router page moves in Google Analytics
   */
  handleLocationChange(location) {
    ReactGAInstance.pageview(location.pathname);
  }

  componentDidMount() {
    const { history } = this.props;
    this.handleLocationChange(history.location);
    this.unlisten = history.listen(this.handleLocationChange);
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    return this.props.children;
  }
}

LocationListener.propTypes = {};

export default withRouter(LocationListener);
