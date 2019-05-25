/**
 * ************************************
 *
 * @module  Tabs
 * @author  boilerplate
 * @date   boilerplate
 * @description Reusable components for rendering tabs and dynamic tab panels
 *
 * ************************************
 */

// dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// components
import TabItem from './TabItem';
import Button from '../ui-templates/Button';
// styles / assets
import styles from '../../stylesheets/modules/ui-templates/Tabs.scss';
import caretLeft from '../../assets/images/icons/caret-left.svg';
import caretRight from '../../assets/images/icons/caret-right.svg';

// utils
import { findOneInQueryString } from '../../utils/queryStringUtil';
import throttle from 'lodash/throttle';


class Tabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabTitles: [],
      tabs: [],
      activeTab: parseInt(findOneInQueryString('tab')) || this.props.initTab || 0,
      overflow: false,
    }

    this.toggleTab = this.toggleTab.bind(this);
    this.calculateTabsLength = this.calculateTabsLength.bind(this);
    this.scrollRight = this.scrollRight.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', throttle(this.calculateTabsLength, 500));
    const { tabTitles, tabs } = this.props.allTabContent.reduce((allTabData, tab) => {
      allTabData.tabTitles.push(tab.title);
      allTabData.tabs.push(tab.content)
      return allTabData;
    }, { tabTitles: [], tabs: [] });

    this.setState({
      tabs,
      tabTitles,
    }, () => {
      // after tabs have been rendered run calculateTabsLength
      // to decide whether to add the shadow effect
      this.calculateTabsLength();
    });
  }

  componentWillUnmont() {
    window.removeEventListener('resize', this.handleResize);
  }

  /**
   * @name calculateTabsLength
   * @description Calculates the length of all combined buttons 
   *  and apply a border shadow to the tabs div if the length is longer than the tabs div
   */
  calculateTabsLength() {
    if (!this.tabs) return;
    // Calculate the combinded length of all buttons within the tabs div
    const lengthOfButtons = this.tabs.children.length * this.tabs.children[0].offsetWidth || null;
    // Calculate the combinded length of all buttons within the tabs div
    const tabsContainerLength = this.tabs.offsetWidth || null;

    // If the length of buttons is greater than the tab container add arrows
    if (lengthOfButtons > tabsContainerLength) {
      // If already overflowing do not setState
      if (this.state.overflow) return;
      else {
        this.setState({
          overflow: true,
        })
      }
      // If the length of buttons is less than the tab container remove arrows or dont add them
    } else {
      // If already not overflowing do not setState
      if (!this.state.overflow) return;
      this.setState({
        overflow: false,
      })
    }
  }

  /**
   * @name toggleTab
   * @description Changes the index of the currently activeTab
   *  in order to render the corresponding tab content and apply the active tab class
   */
  toggleTab(idx) {
    if (idx === this.state.activeTab) return;
    this.setState({
      activeTab: idx,
    });
  }

  /**
   * @name scrollLeft
   * @description Scrolls floating nav buttons to the left when clickin on button
   */
  scrollLeft() {
    this.tabs ? this.tabs.scrollLeft -= this.tabs.clientWidth : null;
  }

  /**
     * @name scrollRight
     * @description Scrolls floating nav buttons to the right when clickin on button     
     */
  scrollRight() {
    this.tabs ? this.tabs.scrollLeft += this.tabs.clientWidth : null;
  }

  render() {
    const tabTitles = this.state.tabTitles.map((title, tabIdx) => {
      return (
        <Button
          theme='tab'
          key={tabIdx}
          btnProps={{ id: tabIdx }}
          handleClick={() => this.toggleTab(tabIdx)}
          activeTab={this.state.activeTab}
        >
          {title}
        </Button>
      )
    })

    const tabContent = this.state.tabs.map((content, tabIdx) => {
      return (
        <TabItem key={tabIdx}>
          {content}
        </TabItem>
      );
    });

    return (
      <div className={styles.tabSection}>
        <div style={{ display: 'flex' }}>
          {
            this.state.overflow &&
            <div className={[styles.icon, styles.iconLeft].join(' ')} onClick={this.scrollLeft}>
              <img src={caretLeft} />
            </div>
          }
          <div
            className={`${styles.tabs}`}
            ref={e => this.tabs = e}
          >
            {tabTitles}
          </div>
          {
            this.state.overflow &&
            <div className={[styles.icon, styles.iconRight].join(' ')} onClick={this.scrollRight}>
              <img src={caretRight} />
            </div>
          }
        </div>
        <div className={styles.tabContent}>
          {tabContent[this.state.activeTab]}
        </div>
      </div>
    );
  }
}

Tabs.propTypes = {
  allTabContent: PropTypes.arrayOf(PropTypes.exact({
    title: PropTypes.string,
    content: PropTypes.any
  })).isRequired, // To render selected content
  initTab: PropTypes.number // To render with specific tab open
}

export default Tabs;