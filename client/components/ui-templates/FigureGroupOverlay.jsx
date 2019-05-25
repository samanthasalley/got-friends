/**
 * ************************************
 *
 * @module  FigureGroupOverlay
 * @author  boilerplate
 * @date    boilerplate
 * @description renders a group of figures with optional overlay text on hover
 *
 * ************************************
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
// components
import Header from './Header';
import Section from './Section';
import Description from './Description';
// styles / assets
import styles from '../../stylesheets/modules/ui-templates/FigureGroupOverlay.scss';
import createClassString from '../../utils/createClassString';

const FigureGroupOverlay = (props) => {
  const { items } = props;

  const FigureItems = items.sort((a, b) => a - b)
    .map((item, i) => {
      const styleLocation = `locationItem${item.position}`;
      const imgClasses = item.styles
        ? createClassString([
          'locationImage', ...item.styles
        ], styles)
        : styles.locationImage;
      if (item.content && item.title) {
        return (
          <figure key={`figure-${item.position}`} className={`${styles.locationItem} ${styles[styleLocation]}`}>
            <img className={imgClasses} src={item.src} alt={item.alt} />
            <div className={styles.overlay}>
              <Header size="h2">{item.title}</Header>
              <Description desc={item.content} descStyles={['descriptionSm', 'removeMarginTop', 'removeMarginBottom']} />
            </div>
          </figure>
        )
      } else {
        return (
          <figure key={`figure-${item.position}`} className={`${styles.locationItem} ${styles[styleLocation]}`}>
            <img className={styles.locationImage} src={item.src} alt={item.alt} />
          </figure>
        )
      }
    });

  return (
    <div className={styles.location}>
      <div className={styles.locationGrid}>
        {FigureItems}
      </div>
    </div>
  );
};

FigureGroupOverlay.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      position: PropTypes.number.isRequired, // note which slot photo should be placed in
      alt: PropTypes.string,
      title: PropTypes.any,
      styles: PropTypes.array,
      content: PropTypes.any,
    }).isRequired,
  ).isRequired,
};

export default FigureGroupOverlay;
