/**
 * ************************************
 *
 * @module  Navbar
 * @author  boilerplate
 * @date    boilerplate
 * @description Main navbar component -> renders NavbarDrawer on mobile
 *
 * ************************************
 */

// dependencies
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
// components
import Button from '../ui-templates/Button';
import NavLink from './NavLink';
import RenderLink from './RenderLink';
import NavbarDrawer from './NavbarDrawer';
// styles / assets
import styles from '../stylesheets/modules/containers/Navbar.scss';
import logo from '../../assets/images/logos/brand-logo.png';

const exampleDropdown = [[
  {
    route: '/',
    title: 'Example Main Link'
  },
  {
    route: '/',
    title: 'Example Sublink',
    sublink: true,
  },
  {
    break: true,
  },
  {
    route: '/',
    title: 'Example Main Link 2'
  },
  {
    route: '/',
    title: 'Example Sublink 2a',
    sublink: true,
  },
  {
    route: '/',
    title: 'Example Sublink 2b',
    sublink: true,
  }
], [
  {
    route: '/',
    title: 'Example Main Link 3'
  },
  {
    route: '/',
    title: 'Example Sublink 3a',
    sublink: true,
  },
  {
    break: true,
  },
  {
    route: '/',
    title: 'Example Main Link 4'
  },
  {
    route: '/',
    title: 'Example Sublink 4a',
    sublink: true,
  },
  {
    route: '/',
    title: 'Example Sublink 4b',
    sublink: true,
  }
]];

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    }

    this.toggleNav = this.toggleNav.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);

  }

  componentWillUnMount() {
    window.removeEventListener('resize', this.handleResize);
  }

  toggleNav() {
    console.log()
    this.setState(prevState => ({
      open: prevState.open ? false : true,
    }))
  }

  handleResize() {
    if (window.innerWidth > 950 & this.state.open) {
      this.setState(prevState => ({
        open: prevState.open ? false : true,
      }))
    }
  }

  render() {
    // NOTE: <nav> has non-modular 'fixedNavbar' class for use in FloatingNav
    return (
      <Fragment>
        <NavbarDrawer open={this.state.open} toggleNav={this.toggleNav} />
        <nav className={[styles.navbar, 'fixedNavbar'].join(' ')}>
          <div className={styles.brand}>
            <Link to="/"><img id="logo" src={logo} alt="Brand Icon" /></Link>
          </div>
          {/* left navbar items */}
          <div className={styles.left} ref={e => this.leftNav = e}>
            <NavLink
              route='/'
              title='Dropdown Example'
              dropdownItems={exampleDropdown}
            />
            <RenderLink linkTo='/'>React Router Link Example</RenderLink>
            <RenderLink linkTo='https://google.com'>External Link Example</RenderLink>
          </div>
          {/* right navbar content */}
          <div className={styles.right}>
            <div className={styles.text}>
              <p>Example of text</p>
            </div>
            <RenderLink linkTo="/">
              <Button theme="blue">Button Example</Button>
            </RenderLink>
            <div className={styles.navbarIconContainer} onClick={this.toggleNav}>
              <span className={styles.navbarIcon}>&nbsp;</span>
            </div>
          </div>
        </nav>
      </Fragment>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));