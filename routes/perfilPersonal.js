"use strict";


const express = require('express');
const router = express.Router();
const dataHandler = require('./../controllers/data_handler');

const veryfyToken = require('./../controllers/token_utils').veryfyToken;


const Perfil = require('../models/users');

const path = require('path');

const views = path.join(__dirname, '../views');

router.use(express.static(views));

// router.route('/')
//     .get((req, res) => {
//         res.sendFile(path.join(views, 'perfilPersonal.html'));
//     });

router.route('/')
    .get(async (req, res) => {
        let decoded = await veryfyToken(req.cookies.token);
        if (decoded == false) {
            res.status(401).send("No tienes permiso para ver esta página");
        }
        else {
            res.status(200).sendFile(path.join(views, 'perfilPersonal.html'));
        }
    });




router.route('/api/')
    .get(async (req, res) => {
        try {
            let decoded = await veryfyToken(req.cookies.token);

            if (decoded == false) {
                res.status(401).send("No tienes permiso para ver esta página");
                return;
            }

            let perfil = await Perfil.findOne({ _correo: decoded._correo });

            res.send(JSON.stringify(perfil));
        } catch (err) {
            // console.error(err);
            res.status(500).send("Error al obtener tu perfil");
        }
    });



module.exports = router;