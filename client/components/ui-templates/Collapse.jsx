/**
 * ************************************
 *
 * @module  Collapse
 * @author  boilerplate
 * @date   boilerplate
 * @description Reusable collapsable heading with content
 *
 * ************************************
 */

// dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// styles
import styles from '../../stylesheets/modules/ui-templates/Collapse.scss';

class Collapse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      descriptionHeight: 0,
    }
    this.toggleCollapse = this.toggleCollapse.bind(this);
  }
  toggleCollapse(e) {
    // Find number of child elements inside the collapse
    const numberOfChildren = this.collapse.children.length;
    // Calculate total height of all child elements inside the collapse
    const collapseHeight = Array.from(this.collapse.children).reduce((accum, curr) => {
      console.log(curr);
      return accum += curr.clientHeight;
    }, 0);

    // Set the total heigth of all elements + 40 px for margin for each element
    this.setState(prevState => ({
      collapsed: !this.state.collapsed,
      descriptionHeight: prevState.collapsed ? 0 : collapseHeight + 40 * numberOfChildren,
    }));
  }

  render() {
    const { collapsed, descriptionHeight } = this.state;

    const caretStyle = this.state.collapsed ? styles.caretRight : styles.caretDown;

    return (
      <div className={styles.collapse} onClick={this.toggleCollapse}>
        <div className={styles.row} onClick={this.toggleCollapse}>
          <div className={styles.caret} onClick={this.toggleCollapse}>
            <span className={caretStyle} onClick={this.toggleCollapse} />
          </div>
          <h3 onClick={this.toggleCollapse}>
            {this.props.header}
          </h3>
        </div>
        <div
          className={styles.details}
          style={{ maxHeight: collapsed ? '0px' : `${descriptionHeight}px` }}
          ref={e => this.collapse = e}
        >
          {this.props.children}
        </div>
      </div>
    )
  }
}

Collapse.propTypes = {
  header: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Collapse;