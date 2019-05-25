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
import * as exampleActions from '../../actions/creators/exampleActions';
import PropTypes from 'prop-types';
// components
import Header from '../ui-templates/Header';
import Section from '../ui-templates/Section';
import Description from '../ui-templates/Description';
// styles / assets
import styles from '../../stylesheets/modules/PageStyles.scss';
// utils
import { checkHashAndscrollToAnchor } from '../../utils/scrolling';

const mapStateToProps = store => ({
  exampleData: store.example.someData,
});

const mapDispatchToProps = dispatch => ({
  getSomeData: () => dispatch(exampleActions.exampleGetData()),
});

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    checkHashAndscrollToAnchor();
    if (!exampleData) this.props.getSomeData();
  }

  componentDidUpdate() {
    checkHashAndscrollToAnchor();
  }

  render() {
    const { exampleData } = this.props;
    
    const ExampleSection = (
      <Section key={`example-section`}
        header={(<Header size="h2">Example Section</Header>)}>
        <Description key="desc-1" desc="Brooklyn Shoreditch disrupt meh +1 squid wolf farm-to-table crucifix XOXO mumblecore chia master cleanse Carles selvage seitan fashion axe you probably haven't heard of them banjo Neutra Truffaut kogi beard pickled vegan ethical try-hard pug pork belly chambray normcore chillwave wayfarers meggings stumptown trust fund direct trade  Cosby sweater flannel slow-carb next level scenester tote bag PBR small batch tousled gentrify pour-over ugh tattooed keffiyeh Etsy Williamsburg drinking vinegar ennui organic DIY heirloom dreamcatcher Intelligentsia fanny pack" />
        <Description key="desc-2" desc="literally Tonx yr fashion axe drinking vinegar fixie Tumblr cray bespoke gastropub tote bag Etsy swag Pitchfork disrupt salvia XOXO asymmetrical Pinterest bicycle rights sustainable lomo banjo Helvetica Schlitz shabby chic hoodie you probably haven't heard of them jean shorts locavore mlkshk pickled cred Truffaut retro biodiesel ugh kitsch pop-up food truck crucifix Williamsburg hella ennui PBR DIY master cleanse meh PBR&B synth Intelligentsia gluten-free wolf deep v single-origin coffee 3 wolf moon stumptown skateboard readymade blog roof party trade" />
        <Description key="desc-3" desc="before they sold out forage try-hard post-ironic selfies freegan Shoreditch lo-fi art party trust fund photo booth keytar tousled cornhole bitters flexitarian YOLO mixtape occupy actually polaroid hashtag dreamcatcher Thundercats Portland High Life pork belly distillery letterpress craft beer whatever irony four loko brunch tofu farm-to-table slow-carb street art 90's Blue Bottle beard cardigan gentrify Echo Park church-key Bushwick vinyl Austin fap +1 flannel sriracha Carles leggings Brooklyn artisan Odd Future kogi pug Banksy Wes Anderson banh mi mustache authentic fingerstache put a bird on it Godard kale chips twee Neutra keffiyeh viral sartorial fanny pack heirloom chambray organic umami Kickstarter VHS wayfarers tattooed American Apparel butcher raw denim iPhone small batch plaid squid 8-bit ethical narwhal next level scenester Marfa selvage aesthetic pour-over typewriter vegan seitan Cosby sweater chillwave quinoa normcore meggings paleo McSweeney's cliche semiotics chia mumblecore Vice messenger bag direct " />
      </Section>
    );
    return (
      <main className={styles.body}>
          {ExampleSection}
      </main>
    );
  }
}

Home.propTypes = {
  // props expected from redux
  getSomeData: PropTypes.func.isRequired,
  exampleData: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
