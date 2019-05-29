/**
 * ************************************
 *
 * @module  Description
 * @author  boilerplate
 * @date    boilerplate
 * @description Renders description based on props after scrubbing out any script tags
 *
 * ************************************
 */

// dependencies
import React, { Component } from "react";
import PropTypes from "prop-types";
import { scrubScriptTags } from "../../utils/contentUtil";
// styling
import styles from "../../stylesheets/modules/ui-templates/Description.scss";
import createClassString from '../../utils/createClassString.js';


const Description = props => {
  const { desc, descStyles } = props;
  const scrubbedDesc = scrubScriptTags(desc);
  const classString = createClassString(descStyles, styles);
  const descClassName = classString ? `${styles.description} ${classString}` : `${styles.description}`;

  return (
    <dl
      className={descClassName}
      dangerouslySetInnerHTML={{ __html: scrubbedDesc }}
    />
  );
};

Description.propTypes = {
  desc: PropTypes.string.isRequired,
  descStyles: PropTypes.oneOfType([ // class to be applied to first section (sbs = left, tb = top)
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
};

export default Description;
