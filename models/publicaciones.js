"use strict";

// Nos conectamos a nuestra instancia local de MongoDB a traves de mongoose
const mongoose = require('mongoose');

const option = {}
let mongoDB = 'mongodb+srv://JaimeGV:3_tacosDeCanasta@mycluster.pi6cvi0.mongodb.net/Tepetaps';
mongoose.connect(mongoDB, option);

let publicacionSchema = mongoose.Schema({
    _titulo: {
        type: String,
        required: true
    },
    _contenido: {
        type: String,
        required: true
    },
    _imagen: {
        type: String,
        required: true
    },
    _autorImagen: {
        type: String,
        required: true
    },
    _autorNombre: {
        type: String,
        required: true
    }
});

let Publicacion = mongoose.model('publicacion', publicacionSchema);

module.exports = Publicacion;



// ---------------------------------------------------------------------------------------


