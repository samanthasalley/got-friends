/**
 * ************************************
 *
 * @module  Home
 * @author  boilerplate
 * @date    boilerplate
 * @description Renders boilerplate homepage
 *
 * ************************************
 */

// dependencies
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as gotActions from '../../actions/creators/gotActions';
import PropTypes from 'prop-types';
// components
// styles / assets
import styles from '../../stylesheets/modules/PageStyles.scss';

const mapStateToProps = store => ({
  regions: store.data.regions,
  fetchedData: store.data.fetchedData,
});

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(gotActions.fetchData()),
});

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.regions) this.props.fetchData();
  }

  render() {
    const { fetchedData, regions } = this.props;

    if (!fetchedData) return (
      <div>Loading...</div>
    );

    if (!Object.keys(regions).length) return (
      <div>No regions</div>
    );

    const DataToRender = Object.keys(regions).map(region => {
      return (
        <div>{region}</div>
      );
    })

    return (
      <main className={styles.body}>
        {DataToRender}
      </main>
    );
  }
}

Home.propTypes = {
  // props expected from redux
  fetchData: PropTypes.func.isRequired,
  regions: PropTypes.object,
  fetchedData: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
