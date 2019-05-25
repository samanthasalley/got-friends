/**
 * ************************************
 *
 * @module  Option
 * @author  boilerplate
 * @date    boilerplate
 * @description option component for dropdown lists
 *
 * ************************************
 */

import React from 'react';
import PropTypes from 'prop-types';

const Option = (props) => (
  <option id={props.id} value={props.value}>{props.name}</option>
);

Option.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  name: PropTypes.any.isRequired,
};

export default Option;