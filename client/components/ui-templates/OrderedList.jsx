/**
 * ************************************
 *
 * @module  OrderedList
 * @author  boilerplate
 * @date    boilerplate
 * @description Renders ordered list based on prop
 * Expects an array of content in props.list
 *
 * ************************************
 */

// dependencies
import React from 'react';
// utils
import { scrubScriptTags } from '../../utils/contentUtil';

const OrderedList = (props) => {
  // set innerhtml so that tags like <b> or <img src> from yaml will render as html
  const listItems = props.list.map((item, i) => {
    const htmlToRender = scrubScriptTags(item); // scrubs item of script tags
    return <li dangerouslySetInnerHTML={{ __html: htmlToRender }} key={i}></li>;
  });

  return (
    <ol>
      {listItems}
    </ol>
  );
};

export default OrderedList;
