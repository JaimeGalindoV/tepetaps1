"use strict";

const express = require('express');
const router = express.Router();
const dataHandler = require('./../controllers/data_handler');

const Mascota = require('../models/animals');

const multer = require('multer');
const upload = multer();

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

router.route('/api/:idAnimal')
    .get(async (req, res) => {
        try {
            let animal = await Mascota.findOne({ _id: req.params.idAnimal})
            res.status(200).json(animal);
        } catch (err) {
            console.error(err);
            res.status(500).send("Error al obtener el animal");
        }
    })
    .put(upload.none(), (req, res) => {
        // console.log(req.body);
        dataHandler.updateAnimal(req, res);

    })
    .delete(async (req, res) => {
        dataHandler.deleteAnimal(req, res);
    });

router.route('/createAnimal')
    .post(upload.none(), (req, res) => {
        dataHandler.createAnimal(req, res);
    });

module.exports = router;
