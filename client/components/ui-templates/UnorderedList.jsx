/**
 * ************************************
 *
 * @module  UnorderedList
 * @author  boilerplate
 * @date    boilerplate
 * @description Renders unordered list based on prop
 * Expects an array of content in props.list
 *
 * ************************************
 */

// dependencies
import React, {Component} from 'react';
// utils
import { scrubScriptTags } from '../../utils/contentUtil';

const UnorderedList = (props) => {
  // set innerhtml so that tags like <b> or <img src> from yaml will render as html
  const listItems = props.list.map((item, i) => {
    const htmlToRender = scrubScriptTags(item); // scrubs item of any script tags
    return <li dangerouslySetInnerHTML={{ __html: htmlToRender }} key={i}></li>;
  });

  return (
    <ul>
      {listItems}
    </ul>
  );
};

export default UnorderedList;
