"use strict";


const express = require('express');
const router = express.Router();
const dataHandler = require('./../controllers/data_handler');

const bcrypt = require('bcrypt'); // add bcrypt for password hashing


const veryfyToken = require('./../controllers/token_utils').veryfyToken;

const path = require('path');

const views = path.join(__dirname, '../views');
router.use(express.static(views));

// router.route('/')
//     .get((req, res) => {
//         res.sendFile(path.join(views, 'admin.html'));
//     });

router.route('/')
     .get(async (req, res) => {
      let decoded = await veryfyToken(req.cookies.token);
        if (decoded === false || decoded._role !== 'ADMIN'){
          return res.redirect('/home');
        }
        res.sendFile(path.join(views, 'admin.html'));
      });

router.route('/users')
      .get(async (req, res) => {
        let decoded = await veryfyToken(req.cookies.token);
        if (decoded === false || decoded._role !== 'ADMIN'){
          return res.status(401).send({ error: 'Unauthorized' });
        }

        if(Object.keys(req.query.length === 0)){
          dataHandler.getUsers(req, res);
        } else{
          dataHandler.findUsers(req, res);
        }
      });

router.route('/users/:correoUser')
      .get(async (req, res) => {
        let decoded = await veryfyToken(req.cookies.token);
        if (decoded === false || decoded._role !== 'ADMIN'){
          return res.status(401).send({ error: 'Unauthorized' });
        }

        dataHandler.getUserByEmail(req, res);
        // res.status(200).send(users);
      })
      .delete(async (req, res) => {
        let decoded = await veryfyToken(req.cookies.token);
        if (decoded === false || decoded._role !== 'ADMIN'){
          return res.status(401).send({ error: 'Unauthorized' });
        }

        dataHandler.deleteUser(req, res);
      });



    
module.exports = router;