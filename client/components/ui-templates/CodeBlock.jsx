/**
 * ************************************
 *
 * @module  CodeBlock
 * @author  boilerplate
 * @date   boilerplate
 * @description CodeBlock component renders 'code blocks' from yaml/markdown
 *
 * ************************************
 */

'use strict';

import React, { Component } from 'react';
import SyntaxHighlighter, { registerLanguage } from "react-syntax-highlighter/prism-light";
import js from 'react-syntax-highlighter/languages/prism/javascript';
import prism from 'react-syntax-highlighter/styles/prism/prism';
import styles from '../../stylesheets/modules/ui-templates/CodeBlock.scss';

registerLanguage('javascript', js);

const CodeBlock = props => {
  const { codeBlock, codeBlockId } = props;
  return (
    <div id={'codeBlockZone' + codeBlockId} className={styles.codeBlock}>
      <SyntaxHighlighter language='javascript' style={prism} >{codeBlock}</SyntaxHighlighter>
    </div>
  );
}

export default CodeBlock;
