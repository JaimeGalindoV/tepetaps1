"use strict";

const express = require('express');

const router = require('./controllers/router');
const loginRouter = require('./controllers/login_router');
const app = express();
const port = process.env.PORT || 3000;

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(port, () => {
    console.log(`Práctica 3 app listening on port ${port}`);
})