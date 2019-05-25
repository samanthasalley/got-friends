/**
 * ************************************
 *
 * @module  exampleRouter
 * @author  boilerplate
 * @date    boilerplate
 * @description exampleRouter to be used as a template for creating express-router files
 *
 * ************************************
 */

const express = require('express');
const router = express.Router();
const exampleController = require('../controllers/exampleController');

router.get('/',
  exampleController.dbQueryExample,
  (req, res) => {
    req.flash('success', ['Successfully completed GET to /example/']);
    return res.status(200).json({
      success: true,
      flash: { ...res.locals.flash },
      data: {
        people: res.locals.people,
      },
    })
  }
);

module.exports = router;
