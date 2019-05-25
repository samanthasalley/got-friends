/**
 * ************************************
 *
 * @module  ScrollToTop
 * @author  boilerplate
 * @date    boilerplate
 * @description Scrolls page to top
 *
 * ************************************
 */

import { Component } from 'react';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * @description using method to check if we're moving through pages, 
   * and if so, we want to scroll to the top of the new page
   */
  componentDidUpdate(prevProps) {
    const prevLocation = prevProps.location;
    const curLocation = this.props.location;
    if (this.props.location !== prevProps.location) {
      window.scrollTo({
        top: 0,
        bottom: 0,
        behavior: 'auto'
      });
    }
  }

  render() {
    return this.props.children || null;
  }
}

export default withRouter(ScrollToTop);