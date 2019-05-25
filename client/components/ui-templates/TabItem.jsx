/**
* ************************************
*
* @module  TabItem
* @author  boilerplate
* @date    boilerplate
* @description Reusable component to render content for a particular tab
*
* ************************************
*/

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

const TabItem = (props) => {
  return (
    <Fragment>{props.children}</Fragment>
  );
}

TabItem.propTypes = {
  children: PropTypes.any.isRequired
};

export default TabItem; 