/**
 * ************************************
 *
 * @module  ModalWrapper
 * @author  boilerplate
 * @date    boilerplate
 * @description Handles the state management for modal
 * 
 * NOTE: there should only ever be one instance of a modal
 *       in the application, so any modal content should
 *       pass through this wrapper.
 *
 * ************************************
 */
// dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as modalActions from '../../actions/creators/modalActions';
import PropTypes from 'prop-types';
// components
import Modal from '../ui-templates/Modal';
// import scoped styles
import styles from '../../stylesheets/modules/utils/ModalWrapper.scss';

const mapStateToProps = store => ({
  ...store.modal,
});

const mapDispatchToProps = dispatch => ({
  /**
   * @name hideModal
   * @description clears modal state content 
   *              and sets visible to false
   */
  hideModal: () => {
    dispatch(modalActions.hideModal());
  },
});

const ModalWrapper = ({ visible, content, hideModal }) => {
  if (visible) {
    return (
      <div className={styles.overlay}>
        <div className={styles.content}>
          <div className={styles.dialog}>
            <Modal close={hideModal}>
              {content}
            </Modal>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

ModalWrapper.propTypes = {
  content: PropTypes.any.isRequired,
  visible: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalWrapper);