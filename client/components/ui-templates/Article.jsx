/**
 * ************************************
 *
 * @module  Article
 * @author  boilerplate
 * @date    boilerplate
 * @description Reusable aritcle component that can generically renders content in an article.
 *
 * ************************************
 */

// dependencies
import React from 'react';
import PropTypes from 'prop-types';
// components
import Button from './Button';
// styling
import styles from '../../stylesheets/modules/ui-templates/Article.scss';
// utils
import extraPropTypes from '../../utils/extraPropTypes';
import createClassString from '../../utils/createClassString.js';

const Article = props => {
  const { theme, first, second, firstSpan, secondSpan, spacing, background, border } = props;
  const firstClassString = createClassString(props.firstClass, styles);
  const secondClassString = createClassString(props.secondClass, styles);

  const themeClasses = {
    sideBySide: {
      firstClass: firstClassString ? firstClassString : styles['left'],
      secondClass: secondClassString ? secondClassString : styles['right']
    },
    topBottom: {
      firstClass: firstClassString ? firstClassString : styles['top'],
      secondClass: secondClassString ? secondClassString : styles['bottom']
    }
  };

  // determine classes based on theme prop
  const { firstClass, secondClass } = themeClasses[theme];

  const secondContent = theme === 'sideBySide'
    ? (<div>
      {second}
    </div>)
    : second;

  return (
    <article className={`${styles[theme]} ${styles[spacing] || ''} ${styles[background] || ''} ${styles[border] || ''}`}>
      <div className={`${firstClass} ${styles[firstSpan] || ''}`}>
        {first}
      </div>
      <div className={`${secondClass} ${styles[secondSpan] || ''}`}>
        {secondContent}
      </div>
    </article>
  );
};

Article.propTypes = {
  theme: PropTypes.oneOf([
    // approved themes
    'sideBySide', 'topBottom'
  ]).isRequired,
  first: PropTypes.node.isRequired, // first section (sbs = left, tb = top)
  second: PropTypes.node.isRequired, // second section (sbs = right, tb = bottom)
  firstClass: PropTypes.oneOfType([ // class to be applied to first section (sbs = left, tb = top)
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  secondClass: PropTypes.oneOfType([ // class to be applied to second section (sbs = right, tb = bottom)
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  spacing: PropTypes.string, // class to apply padding or margin to articles
  background: PropTypes.string, // class to apply to articles to remove or add background color
  border: PropTypes.string, // class to apply to articles to remove or add a border
  // spans are required only on sbs theme
  firstSpan: extraPropTypes.conditional({
    when: props => props.theme === 'sideBySide',
    ownType: 'string',
  }),
  secondSpan: extraPropTypes.conditional({
    when: props => props.theme === 'sideBySide',
    ownType: 'string',
  }),
};

export default Article;
