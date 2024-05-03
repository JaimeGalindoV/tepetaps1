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


router.use('/peluditos', peluditos);
router.use('/perfil', perfilPersonal);
router.use('/publicaciones', publicaciones);
router.use('/admin', validateAdmin, admin);


// GET /, /home, /shopping_cart
const views = path.join(__dirname, '../views');
router.use(express.static(views));

router.route('/register')
    .post(upload.none(), (req, res) => {
        dataHandler.register(req,res);
    });

// -----------------------------------------------------------------------------------------------------
  
router.route('/user')
    .get((req, res) => dataHandler.getUserByEmail(req, res))
    .delete((req, res) => dataHandler.deleteUser(req, res));

// -----------------------------------------------------------------------------------------------------------------------------

router.route('/login')
    .post(upload.none(), (req, res) => {
        console.log(req.body);
        res.sendFile(path.join(views, 'home.html'));
    });

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

function validateAdmin(req, res, next){
    console.log(req.get("x-auth"))
    let adminToken = req.get("x-auth");
    if(adminToken !== "admin"){
        res.status(403).send("Acceso no autorizado, no se cuenta con privilegios de administrador");
    }else{
        next();
    }
}  

    
module.exports = router;
