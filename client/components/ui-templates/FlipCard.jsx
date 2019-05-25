/**
 * ************************************
 *
 * @module  FlipCard
 * @author  boilerplate
 * @date   boilerplate
 * @description Reusable components for rendering flipcards, a card the turns out on hover or click
 *
 * ************************************
 */

// dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// styles
import styles from '../../stylesheets/modules/ui-templates/FlipCard.scss';

class FlipCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFront: true
    }
    this.flipCard = this.flipCard.bind(this);
  }

  flipCard() {
    this.setState({ showFront: !this.state.showFront });
  }

  render() {
    const { frontContent, backContent, frontStyle } = this.props;
    return (
      <article className={styles.card}
        onMouseEnter={this.flipCard}
        onMouseLeave={this.flipCard}
        onClick={this.flipCard}>
        <div className={`${frontStyle ? styles[frontStyle] : styles.cardSide} ${styles.cardSideFront}`}>
          {frontContent}
          <div className={styles.arrow}>&#x3009;</div>
        </div>
        <div className={`${styles.cardSide} ${styles.cardSideBack}`}><div>{backContent}</div></div>
      </article>
    )
  }
}

FlipCard.propTypes = {
  frontContent: PropTypes.node.isRequired,
  backContent: PropTypes.node.isRequired,
  frontStyle: PropTypes.string,
};

export default FlipCard;
