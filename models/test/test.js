const mongoose = require('mongoose');
const User = require('../users');
const bcrypt = require('bcrypt');

const Usuario = require('../../controllers/usuario');


async function test() {
    let correo = "pepe@its.com" // obtén el usuario de la base de datos
    let contraseña = "Aa2345578";
    let user = await User.findOne({ _correo: correo });


    console.log(user.generateToken(contraseña));


    // async function findUser() {
    //     try {
    //         let user = await User.findOne({ _correo: correo });
    //         if (!user) {
    //             console.log("No se encontró ningún usuario con ese nombre de usuario");
    //         } else {
    //             // Compara las contraseñas
    //             if (bcrypt.compareSync(contraseña, user._contraseña)) {
    //                 console.log("Las contraseñas coinciden");
    //             } else {
    //                 console.log("Las contraseñas no coinciden");
    //             }
    //         }
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    // findUser();

}

test();