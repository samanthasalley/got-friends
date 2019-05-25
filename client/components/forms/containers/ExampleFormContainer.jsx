/**
 * ************************************
 *
 * @module  ExampleFormContainer
 * @author  boilerplate
 * @date    boilerplate
 * @description Renders ExampleForm (redux-form)
 *              May be used as template for creating new form containers
 * ************************************
 */

// dependencies
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as exampleActions from '../../actions/creators/exampleActions';
// components
import ExampleForm from '../ExampleForm';
import Header from '../../ui-templates/Header';
import Section from '../../ui-templates/Section';
// styles / assets
import styles from '../../stylesheets/modules/forms/formContainer.scss';

const mapStateToProps = store => ({});

const mapDispatchToProps = dispatch => ({
  updateSomeData: (data) => dispatch(exampleActions.updateExampleData(data)),
});

/**
 * @name submit
 * @param {object} populatedFields of populated form data from ExampleForm
 * @param {function} actionDispatch to invoke with @populatedFields as argument
 *                                  -> need to pass this as param bc we're using 
 *                                     a functional component to render the form
 */
const submit = (populatedFields, actionDispatch) => actionDispatch(populatedFields);

// could also be a stateful component, but in this case there's no need
const ExampleFormContainer = (props) => {
  return (
    <div className={styles.container}>
      <Section>
        <Header size="h2">Redux Form Example</Header>
        <ExampleForm onSubmit={populatedFields => submit(populatedFields, this.props.updateExampleData)} />
        {props.exampleText ? props.exampleText : null}
      </Section>
    </div>
  );
};

ExampleFormContainer.propTypes = {
  // from redux
  updateSomeData: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExampleFormContainer);
