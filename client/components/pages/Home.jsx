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
import { Link } from 'react-router-dom';
import * as gotActions from '../../actions/creators/gotActions';
import PropTypes from 'prop-types';
// components
import Button from '../ui-templates/Button';
import GenderBubbles from '../graphs/GenderBubbles';
import WesterosBurst from '../graphs/WesterosBurst';
// styles / assets
import styles from '../../stylesheets/modules/pages/Home.scss';
import pageStyles from '../../stylesheets/modules/PageStyles.scss';

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
  constructor(props) {
    super(props);

    this.state = {
      toDisplay: 'options',
    };
  }

  updateOption()

  async componentDidMount() {
    if (!this.props.regions) this.props.fetchData();
  }

  render() {
    const { fetchedData, houses, regions, characters } = this.props;

    if (!fetchedData) return (
      <div>Loading...</div>
    );

    return (
      <main className={[pageStyles.centerVertical, pageStyles.centerHorizontal].join(' ')}>
        <div className={styles.options}>
          <Button theme="btn" color="blue" size="lg">
            Westerosi Characters by Region
          </Button>
          <Button theme="btn" color="dark" size="lg">
            The Gender Breakdown of Westeros
          </Button>
        </div>
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
