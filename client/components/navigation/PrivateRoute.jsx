/**
 * ************************************
 *
 * @module  PrivateRoute
 * @author  boilerplate
 * @date    boilerplate
 * @description Route component wrapper to redirect unauthorized users back to login
 * This is a modified version of react-router's example in their docs:
 * https://reacttraining.com/react-router/web/example/auth-workflow
 * ************************************
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import * as actions from '../../actions/creators/authActions';

const mapStateToProps = store => ({
  isLoggedIn: store.user.authorized,
});

const mapDispatchToProps = dispatch => ({
  checkSession: () => {
    dispatch(actions.checkSession());
  },
});

class PrivateRoute extends Component {
  componentDidMount() {
    // If authorized is null (state has not been set yet)
    // fetch /authorized route
    if (this.props.isLoggedIn === null) this.props.checkSession();
  }
  componentWillReceiveProps(nextProps) {
    // When user goes to a different RR path, send a request to /authenticated
    // Makes sure that user is still authenticated while going through private routes
    // If cookie is deleted, application should redirect to signin and deny access
    if (this.props.location.pathname !== nextProps.location.pathname) this.props.checkSession();
  }

  render() {
    const { component: Component, isLoggedIn, checkSession, ...rest } = this.props;
    // Return null so that this route can re-render after fetch sets the appropriate authorized flag
    if (isLoggedIn === null) return null;

    return <Route {...rest} render={props => {
      // If authorized field in store.user is true
      // Take user to the intended location
      if (isLoggedIn === true) return <Component {...props} />
      // If authorized is false, redirect to /login
      if (isLoggedIn === false) return (
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )
    }} />
  }
}

// connect(), adds shouldComponentUpdate to any component it connects
// this results in a shallow comparison of props
// As a consequence, this component will only change when its props change
// This is considered a pure component
// Adding the false option on pure should remedy this effect
export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(PrivateRoute);
