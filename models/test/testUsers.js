// Importamos mongoose
const mongoose = require('mongoose');
const User = require('../users');
const bcrypt = require('bcrypt');

const Usuario = require('../../controllers/usuario');


// Creamos un Usuario nuevo
let newUsuario = {
    _nombre: "Pepe",
    _apellido: "Juan",
    _correo: "pepe@its.com",
    _telefono: "1234567890",
    _contraseña: "Aa2345578",
    _fechaNacimiento: new Date(2000, 0, 1),
    _imagen: "https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg",
    _animales: [],
        _publicaciones: []
    };

    
    let usuario = Usuario.createFromObject(newUsuario);
    
    let usuarioMongoose = User(usuario);
    
    // Guardamos el alumno en nuestra AlumnosDB
    usuarioMongoose.save()
    
    
