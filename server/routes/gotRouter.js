/**
 * ************************************
 *
 * @module  gotRouter
 * @author  samanthasalley
 * @date    2019-05-25
 * @description gotRouter to be used for gotController routes
 *
 * ************************************
 */

const express = require('express');

const router = express.Router();
const gotController = require('../controllers/gotController');

router.get('/',
  gotController.fetchCharacters,
  gotController.fetchHouses,
  gotController.splitCharactersBySeason,
  gotController.sortByRegion,
  (req, res) => res.status(200).json({
    success: true,
    data: {
      houses: res.locals.houses,
      seasons: res.locals.seasons || {},
      characters: res.locals.characters,
      regions: res.locals.regions,
    },
  }),
  // eslint-disable-next-line function-paren-newline
);

module.exports = router;
