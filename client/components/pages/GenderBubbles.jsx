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
import React from 'react';
import PropTypes from 'prop-types';
// components
import RenderBubble from '../graphs/RenderBubble';
// styles / assets

const genderTooltipTheme = {
  tooltip: {
    container: {
      maxHeight: '100px',
      overflowY: 'scroll',
    },
  },
}

const generateGenderTooltip = node => {
  if (node.data && node.data.type === 'gender') {
    const region = node.path.split('.')[1];
    return (
      <div>
        <h2>{region} - {node.data.name} only</h2>
        <p style={{ color: node.data.color }}>{node.data.name}: {node.data.count}</p>
      </div>
    )
  }
  else if (node.data) {
    return (
      <div>
        <h2>{node.data.name}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '10px' }}>
          <p style={{ color: node.data.femaleColor }}>females: {node.data.femaleCount}</p>
          <p style={{ color: node.data.maleColor }}>males: {node.data.maleCount}</p>
        </div>
      </div>
    )
  }
  return null;
};

const generateGenderData = (regions, houses, characters) => {
  const { males: westerosMales, females: westerosFemales, totalWithGender: westerosWithGender } = Object.keys(characters)
    .reduce((data, name) => {
      if (characters[name].gender.toLowerCase() === 'female') data.females += 1;
      else if (characters[name].gender.toLowerCase() === 'male') data.males += 1;
      data.totalWithGender += 1;
      return data;
    }, { males: 0, females: 0, totalWithGender: 0 });
  const westerosData = Object.keys(regions).reduce((root, region, ridx) => {
    const regionObj = { id: region, type: 'region', name: region, femaleCount: 0, femaleColor: '#992828', maleCount: 0, maleColor: '#3b3b8a', children: [] };
    const femaleData = { id: 'female', type: 'gender', name: 'female', count: 0, color: '#992828' };
    const maleData = { id: 'male', type: 'gender', name: 'male', count: 0, color: '#3b3b8a' };
    Object.keys(regions[region].houses).forEach((houseName, hidx) => {
      const charactersInHouse = [...Object.keys(houses[houseName].familyMembers), ...Object.keys(houses[houseName].swornMembers)];
      charactersInHouse.forEach(name => {
        if (characters[name] && characters[name].gender) {
          if (characters[name].gender.toLowerCase() === 'female') {
            femaleData.count += 1;
            regionObj.femaleCount += 1;
            root.femaleCount += 1;
          }
          if (characters[name].gender.toLowerCase() === 'male') {
            maleData.count += 1;
            regionObj.maleCount += 1;
            root.maleCount += 1;
          }
        }
      });
    });
    if (femaleData.count || maleData.count) {
      regionObj.children.push(femaleData);
      regionObj.children.push(maleData);
    }
    if (regionObj.children.length) root.children.push(regionObj);
    return root;
  }, { name: 'Westeros', femaleCount: 0, femaleColor: '#992828', maleCount: 0, maleColor: '#3b3b8a', children: [] });
  return westerosData;
};

const GenderBubbles = ({ regions, houses, characters }) => {
  return (
    <div style={{ height: '700px', width: '1000px' }}>
      <RenderBubble
        root={generateGenderData(regions, houses, characters)}
        generateTooltip={generateGenderTooltip}
        setColorBy='name'
        value='count'
        theme={{ ...genderTooltipTheme }}
      />
    </div>
  );
}

GenderBubbles.propTypes = {
  houses: PropTypes.object.isRequired,
  regions: PropTypes.object.isRequired,
  characters: PropTypes.object.isRequired,
};

export default GenderBubbles;
