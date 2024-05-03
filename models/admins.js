"use strict";

// Nos conectamos a nuestra instancia local de MongoDB a traves de mongoose
const mongoose = require('mongoose');

const option = {}
let mongoDB='mongodb+srv://JaimeGV:3_tacosDeCanasta@mycluster.pi6cvi0.mongodb.net/Tepetaps';
mongoose.connect(mongoDB, option);

let adminSchema = mongoose.Schema({
    _correo:{
        type: String,
        required: true
    },
    _contraseña:{
        type: String,
        required: true
    }
});
let Admin = mongoose.model('admin', adminSchema);

module.exports = Admin;



// ---------------------------------------------------------------------------------------


