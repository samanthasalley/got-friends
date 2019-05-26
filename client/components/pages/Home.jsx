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
  constructor(props) {
    super(props);

    this.state = {
      regions: {},
      houses: {},
      characters: {},
    };
  }

  async componentDidMount() {
    if (!this.props.regions) {
      const { success, data: { regions, houses, characters } } = await this.props.fetchData();
      if (success) return this.setState({
        regions,
        houses,
        characters,
      });
    }
  }

  clickedRegion(region) {
    const regions = { ...this.state.regions };
    regions[region].clicked = !regions[region].clicked;
    Object.keys(regions[region].houses).forEach(houseName => {
      regions[region].houses[houseName].clicked = false;
    });
    return this.setState({ regions });
  }

  clickedHouse(region, houseName) {
    const regions = { ...this.state.regions };
    regions[region].houses[houseName].clicked = !regions[region].houses[houseName].clicked;
    return this.setState({ regions });
  }

  generateRegionButton(region, id) {
    return (
      <Button key={`region-${id}`}
        theme="blue"
        handleClick={() => this.clickedRegion(region)}>
        {region}
      </Button>
    )
  }

  generateHouseButton(region, houseName, id) {
    return (
      <Button key={`house-${id}`}
        theme="blue"
        handleClick={() => this.clickedHouse(region, houseName)}>
        {houseName}
      </Button>
    )
  }

  generateCharacterData(charIds) {
    return charIds.map(id => {
      const char = this.state.characters.byId[id];
      if (!char || !char.name) return null;
      return (<li key={`character-${id}`}>{char.name}</li>);
    }).filter(item => item);
  };

  generateHouseData(region, houseName, id) {
    const HouseButton = this.generateHouseButton(region, houseName, id);
    if (this.state.regions[region].houses[houseName].clicked) {
      const { familyName, houseIds, swornMembers } = this.state.regions[region].houses[houseName];
      const SwornMembers = this.generateCharacterData(Object.keys(swornMembers));
      return (
        <div key={`house-data-${id}`}>
          {HouseButton}
          {SwornMembers.length
            ? <div>
              <h3>Sworn Members</h3>
              <ul>
                {SwornMembers}
              </ul>
            </div>
            : null
          }
        </div>
      );
    }
    else return HouseButton;
  }

  render() {
    const { fetchedData } = this.props;
    const { regions, houses, characters } = this.state;

    if (!fetchedData) return (
      <div>Loading...</div>
    );

    if (!Object.keys(regions).length) return (
      <div>No regions</div>
    );

    const DataToRender = Object.keys(regions).map((region, i) => {
      const RegionButton = this.generateRegionButton(region, i);
      if (regions[region].clicked) {
        const HouseData = Object.keys(regions[region].houses)
          .map((houseName, hidx) => this.generateHouseData(region, houseName, hidx));
        return (
          <div key={`region-container-${i}`}>
            {RegionButton}
            <div>
              {HouseData}
            </div>
          </div>
        )
      }
      else return (<div key={`region-container-${i}`}>{RegionButton}</div>);
    })

    return (
      <main className={[styles.centerVertical, styles.centerHorizontal].join(' ')}>
        {DataToRender}
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
