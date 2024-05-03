"use strict";

const router = require('express').Router();
const dataHandler = require('./data_handler');

router.route('/logIn')
    .post((req,res)=> dataHandler.logIn(req,res));

module.exports = router;