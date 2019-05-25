/**
 * ************************************
 *
 * @module  NavLink
 * @author  boilerplate
 * @date    boilerplate
 * @description Navbar link item with dropdown overlay, if provided
 *
 * ************************************
 */

// dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// components
import RenderLink from './RenderLink';
// styles / assets
import styles from '../../stylesheets/modules/navigation/NavLink.scss';


class NavLink extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownHeight: 0,
      open: false,
    }

    this.openDropdown = this.openDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
  }

  openDropdown() {
    this.setState({
      open: true,
    })
  }

  closeDropdown() {
    // console.log('hello');
    this.setState({
      open: false,
    })
  }

  render() {
    const { route, title, dropdownItems } = this.props;
    const { dropdownHeight } = this.state;

    return (
      <div className={styles.linkContainer} onMouseEnter={this.openDropdown} onMouseLeave={this.closeDropdown}>
        <div className={styles.link}>
          {
            route ? (
              <RenderLink linkTo={route} >
                {title}
              </RenderLink>
            ) : (
                <div className={styles.title}>{title}</div>
              )
          }
        </div>
        {/* If a dropdownItems array is provided, create a dropdown menu */}
        {
          dropdownItems &&
          <div className={styles.dropdown} style={{ display: this.state.open ? 'block' : 'none' }} ref={e => this.dropdown = e}>
            <div className={styles.dropdownGrid} style={{ gridTemplateColumns: `repeat(${dropdownItems.length}, 28rem)` }}>
              {/* map over array of array to create dropdownmenu column containers */}
              {dropdownItems.map((dropdownArr, i) => (
                <div key={`dropdown-col-${i}`} className={styles.dropdownColumn}>
                  {/* map over subarrays and create the columns for the dropdown */}
                  {dropdownArr.map((item, i) => item.break
                    ? (<div key={`dropdown-break-item-${i}`} className={styles.break}></div>)
                    : (<div key={`dropdown-item-${i}`} className={styles.dropdownItem}>
                      <div className={item.sublink ? styles.dropdownSublink : styles.dropdownLink}>
                        {
                          item.route ? (
                            <div onClick={this.closeDropdown}>
                              <RenderLink linkTo={item.route} >
                                {item.title}
                              </RenderLink>
                            </div>
                          ) : (
                              <div className={styles.title}>{item.title}</div>
                            )
                        }
                      </div>
                    </div>)
                  )}
                </div>
              ))}
            </div>
          </div>
        }
      </div>
    )
  }
}

NavLink.propTypes = {
  route: PropTypes.string,
  title: PropTypes.string,
  header: PropTypes.bool,
  dropDownItems: PropTypes.array,
}

export default NavLink;
