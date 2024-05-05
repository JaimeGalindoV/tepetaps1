"use strict";

const express = require('express');
const router = express.Router();
const dataHandler = require('./../controllers/data_handler');

const Mascota = require('../models/animals');

const path = require('path');

const views = path.join(__dirname, '../views');
router.use(express.static(views));


router.route('/')
    .get((req, res) => {
        res.sendFile(path.join(views, 'adoptar.html'));
    });

router.get('/api', async (req, res) => {
        try {
            let mascotas = await Mascota.find({});
            res.json(mascotas);
        } catch (err) {
            console.error(err);
            res.status(500).send("Error al obtener las mascotas");
        }
    });

module.exports = router;