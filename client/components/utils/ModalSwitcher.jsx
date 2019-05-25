/**
 * ************************************
 *
 * @module  ModalSwitcher
 * @author  boilerplate
 * @date    biolerplate
 * @description Decorates component with modal switching functionality
 *
 * @returns render props component with modal switching functions
 *
 * ************************************
 */

// dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as modalActions from '../../actions/creators/modalActions';
// components
import RenderMessage from '../../components/notifications/RenderMessage';
import ExampleFormContainer from '../forms/containers/ExampleFormContainer';

const mapStateToProps = store => ({
  modalVisible: store.modal.visible,
  currentModalName: store.modal.name,
});

const mapDispatchToProps = dispatch => ({
  showModal: (content, name) => {
    return dispatch(modalActions.showModal(content, name));
  },
  updateModal: (content, name) => {
    return dispatch(modalActions.updateModalContent(content, name));
  },
  hideModal: () => {
    return dispatch(modalActions.hideModal());
  },
});

class ModalSwitcher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      /**
       * the following Modal objects are used by generateModalContent
       *  to create modal content which will be used to update redux 
       *  modal store with proper content
       */
      modalOptions: {
        RenderMessage: 'RenderMessage',
        ExampleFormContainer: 'ExampleFormContainer',
      },
      /**
       * defaultProps object contains default data to pass to specified component
       * -> custom modalProps will be used in leiu of these, if provided
       */
      defaultProps = {
        ExampleFormContainer: {
          exampleText: 'Default text provided by ModalSwitcher',
        },
      }
    }

    this.switchModal = this.switchModal.bind(this);
    this.generateModalContent = this.generateModalContent.bind(this);
  }

  /**
   * @name switchModal
   * @param {str} type 
   * @param {object} modalProps will be spread as props to rendered modal
   * @param {Compomnent} customModal will be used if type === 'custom'
   * @description Used to update modal content in redux store
   */
  switchModal(type, modalProps = null, customModal = null) {
    const { currentModalName, modalVisible } = this.props;
    if (this.state.modalOptions[type]) {
      const { content, name } = this.generateModalContent(type, modalProps, customModal);
      if (!modalVisible) return this.props.showModal(content, name); // show if no modal currently displayed
      return this.props.updateModal(content, name); // update already displayed modal content
    }
    return;
  }

  /**
   * @name generateModalContent
   * @param {string} type - referring to a key in this.state.modalOptions
   * @param {object} modalProps will be spread as props to rendered modal
   * @param {Compomnent} customModal will be used if type === 'custom'
   * @description helper function for this.switchModal
   * @returns {obj} with specified modal type content and name props
   */
  generateModalContent(type, modalProps = null, customModal = null) {
    // assign modalProps to default props if no custom props are provided and default props exist
    if (!modalProps) modalProps = this.state.defaultProps[type] || {};
    // declare base content object
    const generatedContent = {
      name: null, 
      content: null,
    };
    // set properties on generatedContent based on props provided
    if (this.state.modalOptions[type]) {
      generatedContent.name = this.state.modalOptions[type];
      generatedContent.content = (<this.state.modalOptions[type] {...modalProps} />);
    };
    else if (customModal && customModal.content) {
      generatedContent.name = customModal.name || 'CustomModal';
      generatedContent.content = customModal.content;
    }
    // return generatedContent (if valid props provided), or false (if content was not set)
    return generatedContent.content ? generatedContent : false;
  }

  render() {
    // create new props object with all incoming props
    //  as well as modal switching functionality
    const renderProps = {
      switchModal: this.switchModal,
      modalOptions: this.state.modalOptions,
    }
    return (
      <div>
        {this.props.render({ ...renderProps })}
      </div>
    );
  }
}

ModalSwitcher.propTypes = {
  render: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  updateModal: PropTypes.func.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  currentModalName: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalSwitcher);
