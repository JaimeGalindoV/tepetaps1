"use strict";

const express = require('express');
const router = express.Router();
const dataHandler = require('../controllers/data_handler');

const Publicacion = require('../models/publicaciones');

const path = require('path');

const views = path.join(__dirname, '../views');
router.use(express.static(views));


router.route('/')
    .get((req, res) => {
        res.sendFile(path.join(views, 'publicaciones.html'));
    });


router.get('/api', async (req, res) => {
        try {
            let publicaciones = await Publicacion.find({});
            res.json(publicaciones);
        } catch (err) {
            console.error(err);
            res.status(500).send("Error al obtener las publicaciones");
        }
    });

router.route('/api/:idPublicacion')
    .get(async (req, res) => {
        try {
            let publicacion = await Publicacion.findById(req.params.idPublicacion);
            res.status(200).json(publicacion);
        } catch (err) {
            console.error(err);
            res.status(500).send("Error al obtener la publicación");
        }
    })
    .delete(async (req, res) => {
        dataHandler.deletePublicacion(req, res);
    });

router.route('/crearPublicacion')
    .post((req, res) => {
        dataHandler.createPublicacion(req, res);
    });

    


module.exports = router;