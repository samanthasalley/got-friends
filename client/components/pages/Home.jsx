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
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as gotActions from '../../actions/creators/gotActions';
import PropTypes from 'prop-types';
// components
import GenderBubbles from './GenderBubbles';
import WesterosBurst from './WesterosBurst';
// styles / assets
import styles from '../../stylesheets/modules/PageStyles.scss';

const mapStateToProps = store => ({
  houses: store.data.houses,
  regions: store.data.regions,
  characters: store.data.characters,
  fetchedData: store.data.fetchedData,
});

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(gotActions.fetchData()),
});

class Home extends Component {

  async componentDidMount() {
    if (!this.props.regions) this.props.fetchData();
  }

  render() {
    const { fetchedData, houses, regions, characters } = this.props;

    if (!fetchedData) return (
      <div>Loading...</div>
    );

    return (
      <main className={[styles.centerVertical, styles.centerHorizontal].join(' ')}>
        {/* <GenderBubbles
          houses={houses}
          regions={regions}
          characters={characters}
        /> */}
        <WesterosBurst
          houses={houses}
          regions={regions}
          characters={characters}
        />
      </main>
    );
  }
}

Home.propTypes = {
  // props expected from redux
  fetchData: PropTypes.func.isRequired,
  houses: PropTypes.object,
  regions: PropTypes.object,
  characters: PropTypes.object,
  fetchedData: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
