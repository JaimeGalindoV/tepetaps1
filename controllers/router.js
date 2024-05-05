"use strict";

const express = require('express');
const router = express.Router();
const path = require('path');
const dataHandler = require('./data_handler');

const multer = require('multer');
const upload = multer();

const peluditos = require('./../routes/peluditos');
const perfilPersonal = require('./../routes/perfilPersonal');
const admin = require('./../routes/admin');
const publicaciones = require('./../routes/publicaciones');

const views = path.join(__dirname, '../views');
router.use(express.static(views));


router.use((req, res, next) => {
    if (req.path.endsWith('.html')) {
        res.status(401).send("No tienes permiso para ver archivos, accede desde las rutas correspondientes");
    } else {
        next();
    }
});

router.use('/peluditos', peluditos);
router.use('/perfil/', perfilPersonal);
router.use('/publicaciones', publicaciones);
router.use('/admin', admin);


// Para '/'
router.route('/')
    .get((req, res) => {
        res.sendFile(path.join(views, 'home.html'));
    })

router.route('/home')
    .get((req, res) => {
        res.sendFile(path.join(views, 'home.html'));
    })

router.route('/darAdopcion')
    .get((req, res) => {
        res.sendFile(path.join(views, 'darAdopcion.html'));
    })



router.route('/register')
    .post(upload.none(), (req, res) => {
        dataHandler.register(req, res);
    });

router.route('/login')
    .post(upload.none(), (req, res) => {
        dataHandler.logIn(req, res);
    });
// -----------------------------------------------------------------------------------------------------

router.route('/user')
    .get(async (req, res) => {
        let user = await dataHandler.getUserByEmail2(req.query.correo);
        if (user != null) {
            res.status(200).json("usuario registrado");
        } else {
            res.status(404).json("usuario no registrado");
        }
    })
    .delete((req, res) => dataHandler.deleteUser(req, res));

// -----------------------------------------------------------------------------------------------------------------------------



function validateAdmin(req, res, next) {
    let adminToken = req.get("x-auth");
    if (adminToken !== "admin") {
        res.status(403).send("Acceso no autorizado, no se cuenta con privilegios de administrador");
    }
    next();
}


module.exports = router;