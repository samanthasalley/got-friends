/**
* ************************************
*
* @module  Section
* @author  boilerplate
* @date    boilerplate
* @description Reusable section component that can generically render content in a section tag.
*
* ************************************
*/

// dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// styling
import createClassString from '../../utils/createClassString';
import styles from '../../stylesheets/modules/ui-templates/Section.scss';

const Section = props => {

  const { header, summary, children, theme, backgroundStyle, secStyles, id } = props;

  let classString = createClassString(secStyles, styles);
  // tack on possible horizontal styling to classString
  if (classString) classString += theme ? ` ${styles.horizontalSection}` : ` ${styles.section}`;
  else classString = theme ? styles.horizontalSection : styles.section;
  
  // vertical bg section summaries should have padding
  let summaryClassString = backgroundStyle === 'vertical'
    ? [styles.summary, styles.summaryPadd].join(' ') 
    : styles.summary;

  return (
    <section id={id ? id : ''}
      className={classString}
      style={{
        backgroundColor: backgroundStyle === 'cover' ? '#F0F5F9' : null,
        padding: backgroundStyle === 'cover'
          || backgroundStyle === 'vertical'
          ? '7rem 0px'
          : '0px'
      }}>
      {(header || summary) && (<div className={styles.content}>
        {header && <div className={styles.header}>{header}</div>}
        {summary && <div className={summaryClassString}>{summary}</div>}
      </div>)}
      <div style={{ width: '90%' }}>
        {children}
      </div>
      {styles[backgroundStyle] && <div className={styles[backgroundStyle]}></div>}
    </section>
  );
}

Section.propTypes = {
  id: PropTypes.string,
  summary: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.node,
  ]),
  header: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.node,
  ]),
  theme: PropTypes.oneOf([
    // approved themes ... these are temporary 
    'background-img-test', 'white', 'grey', 'oneCol', 'twoCol', 'threeCol', 'fourCol', 'vertical', 'horizontal', 'cover',
  ]),
  backgroundStyle: PropTypes.string,
  // add more ...
}

export default Section;
