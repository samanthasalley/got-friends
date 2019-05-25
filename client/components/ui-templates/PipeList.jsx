/**
 * ************************************
 *
 * @module  PipeList
 * @author  boilerplate
 * @date    boilerplate
 * @description Renders passed items with a pipe character in between
 *  First scrubs items of any script tags (and content of script tags)
 *
 * ************************************
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { scrubScriptTags } from '../../utils/contentUtil';
// styles / assets
import styles from '../../stylesheets/modules/ui-templates/PipeList.scss';

const PipeList = (props) => {
  const { list, style } = props;
  const pipedItems = []
  list.forEach((item, i) => {
    if (i > 0) pipedItems.push(<span className={styles.pipe} key={`pipe-${i}`}> | </span>); // push pipe character before each item after the first
    const scrubbedText = scrubScriptTags(item)
    pipedItems.push(<span className={styles.item} dangerouslySetInnerHTML={{ __html: scrubbedText }} key={i}></span>);
  });
  return (
    <div className={style ? styles[style] : styles.list}>{pipedItems}</div>
  );
};

PipeList.propTypes = {
  list: PropTypes.array.isRequired
};

export default PipeList;
