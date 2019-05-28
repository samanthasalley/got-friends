/**
 * ************************************
 *
 * @module  GenderBubbles
 * @author  samanthasalley
 * @date    2019-05-26
 * @description Manipulates / formats GoT data by gender and 
 *              renders in circle-packing Bubble visualization
 *
 * ************************************
 */

// dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// components
import { Treemap } from 'react-vis';
// styles / assets

// const genderTooltipTheme = {
//   tooltip: {
//     container: {
//       maxHeight: '100px',
//       overflowY: 'scroll',
//     },
//   },
// }

// const generateGenderTooltip = node => {
//   if (node.data && node.data.type === 'gender') {
//     const region = node.path.split('.')[1];
//     return (
//       <div>
//         <h2>{region} - {node.data.name} only</h2>
//         <p style={{ color: node.data.color }}>{node.data.name}: {node.data.count}</p>
//       </div>
//     )
//   }
//   else if (node.data) {
//     return (
//       <div>
//         <h2>{node.data.name}</h2>
//         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '10px' }}>
//           <p style={{ color: node.data.femaleColor }}>females: {node.data.femaleCount}</p>
//           <p style={{ color: node.data.maleColor }}>males: {node.data.maleCount}</p>
//         </div>
//       </div>
//     )
//   }
//   return null;
// };

class GenderBubbles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tooltipVisible: false,
      tooltipData: null,
    };

    this.toggleTooltip = this.toggleTooltip.bind(this);
  }

  toggleTooltip(leafNode, domEvent) {
    console.log('leafNode: ', leafNode);
    console.log('domEvent: ', domEvent);
    console.log(`Toggling tooltipVisible to: ${!this.state.tooltipVisible}`);
    this.setState({ tooltipVisible: !this.state.tooltipVisible });
  }

  // generateGenderTooltip(node, event) {
  //   if (node.data && node.data.type === 'gender') {
  //     const region = node.path.split('.')[1];
  //     return (
  //       <div>
  //         <h2>{region} - {node.data.name} only</h2>
  //         <p style={{ color: node.data.color }}>{node.data.name}: {node.data.count}</p>
  //       </div>
  //     )
  //   }
  //   else if (node.data) {
  //     return (
  //       <div>
  //         <h2>{node.data.name}</h2>
  //         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '10px' }}>
  //           <p style={{ color: node.data.femaleColor }}>females: {node.data.femaleCount}</p>
  //           <p style={{ color: node.data.maleColor }}>males: {node.data.maleCount}</p>
  //         </div>
  //       </div>
  //     )
  //   }
  //   return null;
  // }

  generateGenderData(regions, houses, characters) {
    const { males: westerosMales, females: westerosFemales, totalWithGender: westerosWithGender } = Object.keys(characters)
      .reduce((data, name) => {
        if (characters[name].gender.toLowerCase() === 'female') data.females += 1;
        else if (characters[name].gender.toLowerCase() === 'male') data.males += 1;
        data.totalWithGender += 1;
        return data;
      }, { males: 0, females: 0, totalWithGender: 0 });
    const westerosData = Object.keys(regions).reduce((data, region, ridx) => {
      const regionObj = { title: region, color: '#12939A', femaleCount: 0, femaleColor: '#992828', maleCount: 0, maleColor: '#3b3b8a', children: [] };
      const femaleData = { title: 'female', size: 0, color: '#992828' };
      const maleData = { title: 'male', size: 0, color: '#3b3b8a' };
      Object.keys(regions[region].houses).forEach((houseName, hidx) => {
        const charactersInHouse = [...Object.keys(houses[houseName].familyMembers), ...Object.keys(houses[houseName].swornMembers)];
        charactersInHouse.forEach(name => {
          if (characters[name] && characters[name].gender) {
            if (characters[name].gender.toLowerCase() === 'female') {
              femaleData.size += 1;
              regionObj.femaleCount += 1;
              data.femaleCount += 1;
            }
            else if (characters[name].gender.toLowerCase() === 'male') {
              maleData.size += 1;
              regionObj.maleCount += 1;
              data.maleCount += 1;
            }
          }
        });
      });
      if (femaleData.size || maleData.size) {
        regionObj.children.push(femaleData);
        regionObj.children.push(maleData);
      }
      if (regionObj.children.length) data.children.push(regionObj);
      return data;
    }, { title: 'Westeros', color: '#4c4c4c', femaleCount: 0, femaleColor: '#992828', maleCount: 0, maleColor: '#3b3b8a', children: [] });
    return westerosData;
  }

  render() {
    const { regions, houses, characters } = this.props;
    return (
      <div style={{ height: '700px', width: '1000px' }}>
        <Treemap
          title="Westeros By Gender"
          padding={20}
          height={800}
          width={1000}
          mode="circlePack"
          renderMode="SVG"
          animation={true}
          colorType="literal"
          onLeafClick={this.toggleTooltip}
          onLeafMouseOver={this.toggleTooltip}
          onLeafMouseOut={this.toggleTooltip}
          data={this.generateGenderData(regions, houses, characters)}
        />
      </div>
    );
  }
}

GenderBubbles.propTypes = {
  houses: PropTypes.object.isRequired,
  regions: PropTypes.object.isRequired,
  characters: PropTypes.object.isRequired,
};

export default GenderBubbles;
