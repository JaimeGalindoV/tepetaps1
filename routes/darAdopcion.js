"use strict";

const express = require('express');
const router = express.Router();
const dataHandler = require('./../controllers/data_handler');

const Mascota = require('../models/animals');

const path = require('path');

const views = path.join(__dirname, '../views');
router.use(express.static(views));

const veryfyToken = require('./../controllers/token_utils').veryfyToken;

router.route('/')
    .get(async (req, res) => {
        let decoded = await veryfyToken(req.cookies.token);
        if (decoded == false) {
            res.status(401).send("No tienes permiso para ver esta página, inicia sesion");
        }
        else {
            res.status(200).sendFile(path.join(views, 'darAdopcion.html'));
        }
    });




module.exports = router;
