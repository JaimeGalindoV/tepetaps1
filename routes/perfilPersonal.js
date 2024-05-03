"use strict";


const express = require('express');
const router = express.Router();
const dataHandler = require('./../controllers/data_handler');

const Perfil = require('../models/users');

const path = require('path');

const views = path.join(__dirname, '../views');
router.use(express.static(views));


router.route('/')
    .get((req, res) => {
        res.sendFile(path.join(views, 'perfilPersonal.html'));
    });

router.get('/api', async (req, res) => {
        try {
            let perfil = await Perfil.find({});
            res.json(perfil);
        } catch (err) {
            console.error(err);
            res.status(500).send("Error al obtener tu perfil");
        }
    });



module.exports = router;