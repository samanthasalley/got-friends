/**
 * ************************************
 *
 * @module  Group
 * @author  boilerplate
 * @date    biolerplate
 * @description Reusable component for styling a group of components 
 *              in a specific way.
 *              ex. a group of articles should be a grid of 3 columns, so
 *                  we wrap them in this group component in order to provide 
 *                  that threeCol styling to all children items
 *
 * ************************************
 */

// dependencies
import React from 'react';
import PropTypes from 'prop-types';
// styles
import styles from '../../stylesheets/modules/ui-templates/Group.scss';
// utils
import createClassString from '../../utils/createClassString.js';

const Group = ({ groupStyles, children }) => {

  const classString = createClassString(groupStyles, styles);

  return (
    <div className={classString ? classString : null}>
      {children}
    </div>
  );
};

Group.propTypes = {
  groupStyles: PropTypes.oneOfType([
    PropTypes.oneOf([
    // approved themes
    'oneCol', 'twoCol', 'threeCol', 'fourCol', 'flipCards', 'center', 'callToAction', 'underline', 'quote', 'coloredArticles', 'reducedMargin', 'smallGroup', 'iconGroup', 'iconsTwoCol', 'singleArticle', 'rows', 'reverseColoredArticles', 'singleGroup', 'centeredVertically'
    ]).isRequired,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  children: PropTypes.node.isRequired, // all content for group
};

export default Group;