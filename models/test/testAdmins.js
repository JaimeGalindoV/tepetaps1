
// Importamos mongoose
const mongoose = require('mongoose');
const UserMongoose = require('../users');
const Admin = require('../../controllers/admin');

// Creamos un Usuario nuevo
let newAdmin = {
    _nombre: "Pepe",
    _apellido: "Pecas",
    _correo: "pepe@its.com",
    _contraseña: "Aa2345678"
};

let admin = Admin.createFromObject(newAdmin);
console.log(admin);

let usuarioMongoose = UserMongoose(admin);

// // Guardamos el alumno en nuestra AlumnosDB
usuarioMongoose.save()
