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
// import RenderBubble from '../graphs/RenderBubble';
import GenderBubbles from './GenderBubbles';
// styles / assets
import styles from '../../stylesheets/modules/PageStyles.scss';
import { notDeepEqual } from 'assert';

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

  generateWesterosData() {
    const { regions, houses, characters } = this.props;
    const westerosData = Object.keys(regions).reduce((root, region, ridx) => {
      const regionObj = { id: region, type: 'region', name: region, color: 'hsl(204, 71%, 41%)', children: [] };
      Object.keys(regions[region].houses).forEach((houseName, hidx) => {
        const houseObj = { id: houseName, type: 'house', name: houseName, children: [] };
        Object.keys(houses[houseName].familyMembers).forEach(char => {
          const familyObj = { id: char, type: 'char', name: char, color: 'hsl(0, 62%, 45%)', size: 147126 };
          houseObj.children.push(familyObj);
        });
        Object.keys(houses[houseName].swornMembers).forEach(char => {
          const swornObj = { id: char, type: 'char', name: char, color: 'hsl(308, 34%, 36%)', size: 8000 };
          houseObj.children.push(swornObj);
        });
        regionObj.children.push(houseObj);
      });
      root.children.push(regionObj);
      return root;
    }, { name: 'Westeros', children: [] });
    return westerosData;
  }

  render() {
    const { fetchedData, houses, regions, characters } = this.props;

    if (!fetchedData) return (
      <div>Loading...</div>
    );

    // this.generateWesterosData();

        // <div style={{ height: '700px', width: '1000px' }}>
        //   <RenderBubble root={this.generateWesterosData()} />
        // </div>
    return (
      <main className={[styles.centerVertical, styles.centerHorizontal].join(' ')}>
        <GenderBubbles
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
