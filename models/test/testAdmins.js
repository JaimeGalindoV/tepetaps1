
// Importamos mongoose
const mongoose = require('mongoose');
const AdminMongoose = require('../admins');
const Admin = require('../../controllers/admin');

// Creamos un Usuario nuevo
let newAdmin = {
    _correo: "pepe@its.com",
    _contraseña: "Aa2345678"
};

let admin = Admin.createFromObject(newAdmin);
console.log(admin);

let usuarioMongoose = AdminMongoose(admin);

// // Guardamos el alumno en nuestra AlumnosDB
usuarioMongoose.save()
