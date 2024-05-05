"use strict";

// Nos conectamos a nuestra instancia local de MongoDB a traves de mongoose
const mongoose = require('mongoose');
const option = {}
let mongoDB='mongodb+srv://JaimeGV:3_tacosDeCanasta@mycluster.pi6cvi0.mongodb.net/Tepetaps';

mongoose.connect(mongoDB, option);

let animalSchema = mongoose.Schema({
    _nombre:{
        type: String,
        required: true
    },
    _tipo:{
        type: String,
        required: true
    },
    _imagen:{
        type: String,
        required: true
    },
    _raza:{
        type: String,
        required: true
    },
    _sexo:{
        type: String,
        required: true
    },
    _caracter: String,
    _edad: Array,
    _ubicacion:{
        type: String,
        required: true
    },
    _pelajeTipo:{
        type: String,
        required: true
    },
    _pelajeColor:{
        type: String,
        required: true
    },
    _pelajeLargo:{
        type: String,
        required: true
    },
    _estirilizado:{
        type: Boolean,
        required: true
    },
    _fechaDesparasitacion: Date,
    _vacunas: Array,
    _paracitos: Array,
    _enfermedades: String,
    _discapacidad: String,
    _estado: Boolean,
    _correoUser: {
        type: String,
        required: true
    }
});

let animal = mongoose.model('animal', animalSchema);

module.exports = animal;



// ---------------------------------------------------------------------------------------


