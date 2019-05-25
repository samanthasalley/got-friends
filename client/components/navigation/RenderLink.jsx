/**
 * ************************************
 *
 * @module  RenderLink
 * @author  boilerplate
 * @date    boilerplate
 * @description Wrapper component for React-Router <Link> and HTML <a> tags
 *              to dynamically use Link or anchor based on whether or not it 
 *              is an external link, and to add styles
 *
 * ************************************
 */

import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import styles from "../../stylesheets/modules/ui-templates/RenderLink.scss";
import createClassString from '../../utils/createClassString';

/**
 * @name pathIsExternalLink
 * @param {string} to 
 * @description helper function to check if path is to app nav link or external url
 */
const pathIsExternalLink = to => to.slice(0, 4) === 'http';
const pathIsMailtoLink = to => to.slice(0, 6) === 'mailto';

const RenderLink = props => {
  const { linkTo, linkStyles, children } = props;
  const classString = createClassString(linkStyles, styles);
  const linkClassName = classString ? classString : '';

  const LinkItem = pathIsExternalLink(linkTo)
    // if linkTo goes to external url, render as <a></a> tag
    ? (<a href={linkTo} target="_blank" className={linkClassName}>{children}</a>)
    // if linkTo goes to mailto url, render as <a></a> tag
    : pathIsMailtoLink(linkTo)
      ? (<a href={linkTo} target="_top" className={linkClassName}>{children}</a>)
      // otherwise, render as <Link></Link> tag
      : (<Link to={linkTo} className={linkClassName}>{children}</Link>);

  return LinkItem;
};

RenderLink.propTypes = {
  linkTo: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  linkStyles: PropTypes.arrayOf(
    PropTypes.oneOf([
      // link style classes here...
      'inline',
      'marginTop',
      'marginLeft',
      'marginRight',
    ]).isRequired,
  ),
};

export default RenderLink;
