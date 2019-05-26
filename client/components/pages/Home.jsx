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
import Button from '../ui-templates/Button';
import RenderBubble from '../graphs/RenderBubble';
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

  generateWesterosData(regions, characters) {
    return Object.keys(regions).reduce((formatted, region) => {
      const regionObject = { name: region, color: 'hsl(163, 70%, 50%)', children: [] };
      Object.keys(regions[region].houses).forEach(houseName => {
        const { familyName, houseIds, swornMembers } = regions[region].houses[houseName];
        const houseObject = { name: houseName, color: 'hsl(66, 70%, 50%)', children: [] };
        Object.keys(swornMembers)
          .filter(charId => characters.byId[charId] && characters.byId[charId].name)
          .forEach(charId => {
            const { name: charName } = characters.byId[charId];
            const charObject = { name: charName, color: 'hsl(300, 70%, 50%)', loc: 147126 };
            houseObject.children.push(charObject);
          });
        regionObject.children.push(houseObject);
      });
      formatted.children.push(regionObject);
      return formatted;
    }, { name: 'Westeros', color: 'hsl(67, 70%, 50%)', children: [] })
  }

  render() {
    const { fetchedData, regions, houses, characters } = this.props;

    if (!fetchedData) return (
      <div>Loading...</div>
    );

    if (!Object.keys(regions).length) return (
      <div>No regions</div>
    );

    return (
      <main className={[styles.centerVertical, styles.centerHorizontal].join(' ')}>
        <div style={{ height: '500px', width: '900px' }}>
          <RenderBubble root={this.generateWesterosData(regions, characters)} />
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
