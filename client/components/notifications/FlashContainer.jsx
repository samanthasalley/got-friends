/**
 * ************************************
 *
 * @module  FlashContainer
 * @author  boilerplate
 * @date    boilerplate
 * @description Handles the state management for flash messages
 *
 * ************************************
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as flashActions from '../../actions/creators/flashActions';
import FlashMessage from './FlashMessage';

import styles from '../stylesheets/modules/notifications/Flash.scss';

const mapStateToProps = store => (
  {
    // server-side flash status
    flash: store.flash.flash,
    // client-side flash status
    flashStatus: store.flash,
  }
);

const mapDispatchToProps = dispatch => ({
  /**
   * hideFlash triggers a dispatch to update client-side flash status
   * @param {Object} flashUpdateObj should contain information below
   * flashType - 'success'/'error'/additional types or flashTypes
   * arrIndex - integer - this mirrors the array index that is given back from the server
   * status - currently only 'hide' will be used
   */
  hideFlash: (flashUpdateObj) => {
    dispatch(flashActions.hideFlash(flashUpdateObj));
  },
  clearFlash: () => {
    dispatch(flashActions.clearFlash());
  },
});

class FlashContainer extends Component {
  // On any new request, store.user.flash will be refreshed
  // in this case, clear out store.flash (clientside) to display fresh messages
  componentWillReceiveProps(nextProps) {		
    if (nextProps.flash !== this.props.flash) this.props.clearFlash();
  }

  render() {
    const flashObj = this.props.flash;
    // flash: { error: ['password is wrong', 'email is wrong], success: ['welcome to csx']}
    const flashMessagesRender = [];
    // Iterate through available error types: there should typically be just one message
    // This loop ensures to create additonal flashMessage renders for more the one flash
    if (flashObj && Object.keys(flashObj).length) {
      Object.keys(flashObj).forEach((flashType) => {
        flashObj[flashType].forEach((message, i) => {
          flashMessagesRender.push(
            <FlashMessage
              flashStatus={this.props.flashStatus[flashType]}
              hideFlash={this.props.hideFlash}
              message={message}
              flashType={flashType}
              arrIndex={i}
              key={i}
            />
          );
        });
      });
    }

    return (
      <div>
        {flashMessagesRender}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlashContainer);