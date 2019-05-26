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
  (req, res) => res.status(200).json({
    success: true,
    data: {
      characters: res.locals.characters,
    },
  }),
  // eslint-disable-next-line function-paren-newline
);

module.exports = router;
