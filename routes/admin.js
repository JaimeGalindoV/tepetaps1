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

router.route('/create-admin')
    .post(async (req, res) => {
       const { username, password } = req.body;
       if (!username ||!password) {
         return res.status(400).send({ error: 'Username and password are required' });
       }
       const hashedPassword = await bcrypt.hash(password, 10);
       // create a new admin user in your database
       dataHandler.createUser({ username, password: hashedPassword, role: 'admin' })
        .then(() => res.send({ message: 'Admin user created successfully' }))
        .catch((err) => res.status(500).send({ error: 'Error creating admin user' }));
     });

router.route('/login')
     .post(async (req, res) => {
        const { username, password } = req.body;
        if (!username ||!password) {
          return res.status(400).send({ error: 'Username and password are required' });
        }
        const adminUser = await dataHandler.getUserByUsername(username);
        if (!adminUser) {
          return res.status(401).send({ error: 'Invalid username or password' });
        }
        const isValidPassword = await bcrypt.compare(password, adminUser.password);
        if (!isValidPassword) {
          return res.status(401).send({ error: 'Invalid username or password' });
        }
        // login successful, set a session or token to authenticate the admin
        req.session.admin = true;
        res.send({ message: 'Logged in successfully' });
      });
    

    
module.exports = router;