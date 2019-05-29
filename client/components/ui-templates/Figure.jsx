/**
 * ************************************
 *
 * @module  Figure
 * @author  boilerplate
 * @date    boilerplate
 * @description Renders HTML5 figure and caption (optional) based on props
 * @requires that image src (if filepath) is located somewhere in /client/assets dir
 *
 * ************************************
 */

// dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { srcIsExternal, srcIsMailto } from '../../utils/contentUtil';
// styling
import createClassString from '../../utils/createClassString';
import styles from '../../stylesheets/modules/ui-templates/Figure.scss';

const Figure = (props) => {
  const { imgSrc, altTag, caption, figStyles } = props;
  // if img is src locally (not hosted online),
  // src will be the required in image file
  // otherwise, just src will be the url
  const imgSrcPath = srcIsExternal(imgSrc) || srcIsMailto(imgSrc)
    ? imgSrc
    : require(`../../assets/${imgSrc}`);

  const classString = createClassString(figStyles, styles);

  return (
    <figure className={classString ? classString : styles.figure}>
      <img src={imgSrcPath} alt={altTag} />
      {caption ?
        <figcaption>{caption}</figcaption> :
        null
      }
    </figure>
  );
};

Figure.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  altTag: PropTypes.string,
  figStyles: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  caption: PropTypes.string
};

export default Figure;
