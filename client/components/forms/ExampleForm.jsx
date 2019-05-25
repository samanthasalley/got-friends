/**
 * ************************************
 *
 * @module  ExampleForm
 * @author  boilerplate
 * @date    boilerplate
 * @description Example eedux-form component. Field component connects input to form reducer.
 *
 * ************************************
 */

// dependencies
import React from 'react';
import { Field, reduxForm } from 'redux-form';
// components
import RenderField from './fields/RenderField';
import Button from '../ui-templates/Button';
// utils
import { required } from './validators/validators';

let ExampleForm = props => {
  const { handleSubmit, submitting, btnText } = props;

  return (
    <form onSubmit={handleSubmit} className="form-element">
      <Field
        name="text-field-1"
        component={RenderField}
        type="text"
        label="Enter Some Text"
        validate={required}
        validateOn="blur"
      />
      <Field
        name="text-field-2"
        component={RenderField}
        type="text"
        label="How about some optional text!"
      />
      <Button
        theme="blue"
        type="submit"
        disabled={submitting}
      >
        {btnText || 'Submit'}
      </Button>
    </form>
  );
};

// Wrap form with reduxForm to bind user interaction to dispatch Redux actions
ExampleForm = reduxForm({
  form: 'exampleForm',
})(ExampleForm);

export default ExampleForm;
