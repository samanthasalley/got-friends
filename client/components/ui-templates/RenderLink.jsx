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
import { srcIsExternal, srcIsMailto } from '../../utils/contentUtil';
// styles
import styles from "../../stylesheets/modules/ui-templates/RenderLink.scss";
import createClassString from '../../utils/createClassString';

const RenderLink = props => {
  const { linkTo, linkStyles, children } = props;
  const classString = createClassString(linkStyles, styles);
  const linkClassName = classString ? classString : '';

  const LinkItem = srcIsExternal(linkTo)
    // if linkTo goes to external url, render as <a></a> tag
    ? (<a href={linkTo} target="_blank" className={linkClassName}>{children}</a>)
    // if linkTo goes to mailto url, render as <a></a> tag
    : srcIsMailto(linkTo)
      ? (<a href={linkTo} target="_top" className={linkClassName}>{children}</a>)
      // otherwise, render as <Link></Link> tag
      : (<Link to={linkTo} className={linkClassName}>{children}</Link>);

  return LinkItem;
};

RenderLink.propTypes = {
  linkTo: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  linkStyles: PropTypes.oneOfType([ // class to be applied to first section (sbs = left, tb = top)
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
};

export default RenderLink;
