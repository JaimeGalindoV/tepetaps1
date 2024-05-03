"use strict";

// Nos conectamos a nuestra instancia local de MongoDB a traves de mongoose
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let privateKey =  process.env.TOKEN_KET; "ABC123#"

const option = {}
let mongoDB='mongodb+srv://JaimeGV:3_tacosDeCanasta@mycluster.pi6cvi0.mongodb.net/Tepetaps';
mongoose.connect(mongoDB, option);

let userSchema = mongoose.Schema({
    _nombre:{
        type: String,
        required: true
    },
    _apellido:{
        type: String,
        required: true
    },
    _correo:{
        type: String,
        required: true
    },
    _telefono:{
        type: String,
        required: true
    },
    _contraseña:{
        type: String,
        required: true
    },
    _fechaNacimiento:{
        type: Date,
        require: true
    },
    _imagen: String,
    _animales: Array, 
    _publicaciones: Array
});


userSchema.pre('save', function(next){
    let user = this;
    user._contraseña = bcrypt.hashSync(user._contraseña, 10);
    next();
})

userSchema.methods.generateToken = function(password) {
    let user = this;
    let payload = { id:user._id, role: user.role};
    let options = {expiresIn: 60*60}

    if(bcrypt.compareSync(password,user.password)){
        try{
            return jwt.sign(payload,privateKey, options);
        }catch(err){
            console.log(err);
        }
    }
}


let User = mongoose.model('user', userSchema);

module.exports = User;



// ---------------------------------------------------------------------------------------


