/**
 * ************************************
 *
 * @module  FlashMessage
 * @author  boilerplate
 * @date    boilerplate
 * @description Renders individual flash message
 *
 * ************************************
 */

import React, { Component } from 'react';

import styles from '../../stylesheets/modules/notifications/Flash.scss';

let showTimeout;
class FlashMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delayedFlash: '',
    };
  }

  componentDidMount() {
    // Delay appending flashType to class to trigger CSS transitions
    window.setTimeout(() => this.setState({ delayedFlash: this.props.flashType }), 0);
    // Hide flash message after 5 seconds
    clearTimeout(showTimeout);
    showTimeout = window.setTimeout(() => this.props.hideFlash({
      flashType: this.props.flashType,
      arrIndex: this.props.arrIndex,
      status: 'dismissed',
    }), 5000);
  }
  
  componentWillReceiveProps(nextProps) {
    // Since flash message is now dependent on local state, must update state when store is updated
    this.setState({ delayedFlash: nextProps.flashType });
    // Hide flash message after 5 seconds
    clearTimeout(showTimeout);
    showTimeout = window.setTimeout(() => this.props.hideFlash({
      flashType: this.props.flashType,
      arrIndex: this.props.arrIndex,
      status: 'dismissed',
    }), 5000);
  }

  handleClick(e, flashUpdateObj) {
    e.preventDefault();
    this.props.hideFlash(flashUpdateObj);
  }

  render() {
    // flag for message status (dismissed/showing)
    const status = this.props.flashStatus[this.props.arrIndex] === 'dismissed' ? true : false;
    // To be passed into dismiss button
    const flashUpdateObj = {
      flashType: this.props.flashType,
      arrIndex: this.props.arrIndex,
      status: 'dismissed',
    };

    // dynamically create message classname based on type of flash and status
    const createClassName = () => {
      let classname = `${styles.message}`;
      if (this.state.delayedFlash) classname += ' ' + styles[this.state.delayedFlash];
      if (status) classname += ' ' + styles.dismissed;
      return classname;
    };

    return (
      // className/style determined by statusType from server and flashReducer
      // ex: error -> flash-error, success -> flash-success
      // Make sure to initialize the state in store.flash when adding new types of flash messages
      <div className={createClassName()}>
        { this.props.message } <a href="#" className={styles.close} onClick={(e) => this.handleClick(e, flashUpdateObj)} >×</a>
      </div>
    );
  }
}

export default FlashMessage;
