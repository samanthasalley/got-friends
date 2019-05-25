/**
 * ************************************
 *
 * @module  Title
 * @author  boilerplate
 * @date    boilerplate
 * @description Renders title based on props
 *
 * ************************************
 */

// dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scrubScriptTags } from '../../utils/contentUtil';
// styling
import createClassString from '../../utils/createClassString';
import styles from '../../stylesheets/modules/ui-templates/Title.scss';

const Title = (props) => {
  const { titleStyles } = props;
  const scrubbedText = scrubScriptTags(props.title);
  const classString = createClassString(titleStyles, styles);

  return (
    <p className={classString ? classString : styles.title} dangerouslySetInnerHTML={{ __html: scrubbedText }}></p>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired
};

export default Title;
