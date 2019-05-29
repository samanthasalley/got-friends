

// dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { generateRandomColorPalette } from '../../utils/randomColorUtil';
// components
import { Hint, Sunburst } from 'react-vis';

// custom styles for tooltip
const tipStyle = {
  display: 'flex',
  flexDirection: 'column',
  color: '#fff',
  fontWeight: '700',
  background: 'rgba(0, 0, 0, 0.6)',
  alignItems: 'center',
  padding: '10px',
  borderRadius: '5px',
};

/**
 * @name buildHoverValue
 * @param {object} hoveredCell 
 * @description parses cell location data to determine position for hover tooltip
 * @returns {object} with {x,y} coordinates for tooltip
 * @see https://github.com/uber/react-vis/blob/master/showcase/sunbursts/sunburst-with-tooltips.js
 */
const buildHoverValue = (hoveredCell) => {
  const { radius, angle, angle0 } = hoveredCell;
  const truedAngle = (angle + angle0) / 2;
  const dataToReturn = {
    x: radius * Math.sin(truedAngle),
    y: radius * Math.cos(truedAngle),
  };
  return dataToReturn;
}

/**
 * @name generateMembersData
 * @param {array} swornMembers 
 * @param {array} familyMembers 
 * @param {string} houseName 
 * @param {string} houseColor 
 * @description creates react-vis sunburst nodes for character data
 * @returns {array} of node data
 */
const generateMembersData = (swornMembers, familyMembers, houseName, houseColor) => {
  const createMemberObj = (char, color, charType) => ({
    title: char,
    color: color,
    size: 1,
    typeOfNode: 'char',
    charType,
    houseName,
    displayOnHover: charType === 'Family Member' ? `${char} of House ${houseName}` : char,
  });
  const houseMembersData = [];
  const totalSwornMems = swornMembers.length;
  const totalFamilyMems = familyMembers.length;
  const totalMems = totalSwornMems + totalFamilyMems
  if (totalMems === 0) return [];
  const familyColor = generateRandomColorPalette({ luminosity: 'dark', hue: houseColor });
  const swornColor = generateRandomColorPalette({ luminosity: 'light', hue: houseColor });
  familyMembers.forEach((char, charI) => houseMembersData.push(createMemberObj(char, familyColor, 'Family Member')));
  swornMembers.forEach((char, charI) => houseMembersData.push(createMemberObj(char, swornColor, 'Sworn Member')));
  return houseMembersData;
};

/**
 * @name generateHousesData
 * @param {object} houses 
 * @param {object} characters 
 * @param {array} regionHouses 
 * @param {string} regionName 
 * @param {string} regionColor 
 * @description creates react-vis sunburst nodes for region's house data
 * @returns {array} of node data
 */
const generateHousesData = (houses, characters, regionHouses, regionName, regionColor) => {
  const housesColorPalette = generateRandomColorPalette({
    count: regionHouses.length,
    hue: regionColor
  });
  const regionHouseData = regionHouses.map((houseName, hidx) => {
    const houseObj = {
      title: houseName,
      color: housesColorPalette[hidx],
      children: generateMembersData(
        Object.keys(houses[houseName].swornMembers).filter(mem => isNaN(parseInt(mem))),
        Object.keys(houses[houseName].familyMembers).filter(mem => isNaN(parseInt(mem))),
        houseName,
        housesColorPalette[hidx]
      ),
      typeOfNode: 'house',
      displayOnHover: `House ${houseName}`,
    };
    houseObj.numberOfMembers = houseObj.children.length;
    return houseObj;
  }).filter(houseObj => houseObj.children.length);
  return regionHouseData;
};

/**
 * @name generateWesterosData
 * @param {object} regions 
 * @param {object} houses 
 * @param {object} characters 
 * @description creates react-vis sunburst data
 * @returns {object} of all sunburst data
 */
const generateWesterosData = (regions, houses, characters) => {
  const regionsColorPalette = generateRandomColorPalette({ count: Object.keys(regions).length });
  const westerosData = Object.keys(regions).reduce((data, region, ridx) => {
    const regionObj = {
      title: region,
      label: region,
      labelStyle: { fontSize: 10 },
      color: regionsColorPalette[ridx],
      children: generateHousesData(
        houses,
        characters,
        Object.keys(regions[region].houses),
        region,
        regionsColorPalette[ridx]
      ),
      typeOfNode: 'region',
      displayOnHover: region,
    };
    if (regionObj.children.length) {
      regionObj.numberOfHouses = regionObj.children.length;
      data.children.push(regionObj);
    }
    return data;
  }, {
      title: 'Westeros',
      label: 'Westeros',
      labelStyle: { fontSize: 15 },
      dontRotateLabel: true,
      color: '#ffffff',
      children: [],
      displayOnHover: false,
    });
  return westerosData;
};

class WesterosBurst extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hoveredCell: false,
      westerosData: null,
    };

    this.handleHoverIn = this.handleHoverIn.bind(this);
    this.handleHoverOut = this.handleHoverOut.bind(this);
  }

  handleHoverIn(v) {
    return this.setState({ hoveredCell: v.displayOnHover ? v : false });
  }

  handleHoverOut(v) {
    return this.setState({ hoveredCell: false });
  }

  componentDidMount() {
    const { regions, houses, characters } = this.props;
    const westerosData = generateWesterosData(regions, houses, characters);
    return this.setState({ westerosData });
  }

  render() {
    const { westerosData, hoveredCell } = this.state;
    if (!westerosData) return (
      <div>
        Processing data...
      </div>
    );

    return (
      <div>
        <h1>Westerosi Characters by House and Region</h1>
        <Sunburst
          hideRootNode
          title="Characters by House and Region"
          height={700}
          width={1000}
          data={westerosData}
          animation={true}
          colorType="literal"
          stroke="white"
          onValueMouseOver={this.handleHoverIn}
          onValueMouseOut={this.handleHoverOut}
        >
          {hoveredCell ? (
            <Hint value={buildHoverValue(hoveredCell)}>
              <div style={tipStyle}>
                <div>{hoveredCell.displayOnHover}</div>
                {hoveredCell.typeOfNode === 'char'
                  && <div>{hoveredCell.charType === 'Family Member'
                    ? hoveredCell.charType
                    : `${hoveredCell.charType} of House ${hoveredCell.houseName}`}</div>}
              </div>
            </Hint>
          ) : null}
        </Sunburst>
      </div>
    );
  }
}

WesterosBurst.propTypes = {
  houses: PropTypes.object.isRequired,
  regions: PropTypes.object.isRequired,
  characters: PropTypes.object.isRequired,
};

export default WesterosBurst;
