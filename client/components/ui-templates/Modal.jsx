/**
 * ************************************
 *
 * @module  Modal
 * @author  boilerplate
 * @date    boilerplate
 * @description Reusable Modal for any modal content.
 * 
 * NOTE: Should be used in conjunction with ModalWrapper 
 *       --> singleton using Redux to track visible status and content
 *
 * ************************************
 */

import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/fontawesome-free-solid';
import PropTypes from 'prop-types';
import Button from './Button';
// import scoped styles
import styles from '../../stylesheets/modules/ui-templates/Modal.scss';

const Modal = ({ children, close }) => {
  return (
    <div className={styles.modal}>
      <button className={styles.close} onClick={close}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <figure className={styles.logo}>
        {/* add logo image here */}
      </figure>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.any.isRequired,
  close: PropTypes.func.isRequired,
};

export default Modal;
