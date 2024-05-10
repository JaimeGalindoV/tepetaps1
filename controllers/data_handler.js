"use strict";



const User = require('../models/users');
const Usuario = require('./usuario');

const Animal = require('../models/animals');
const AnimalClass = require('./animal');

const Publicacion = require('../models/publicaciones');
const PublicacionClass = require('./publicacion');

const { verify } = require('jsonwebtoken');

const veryfyToken = require('./token_utils').veryfyToken;



function logIn(req, res){
    let correo = req.body._correo;
    let contraseña = req.body._contraseña;
    
    // Verifica si el usuario existe en la base de datos
    User.findOne({ _correo: `${correo}` })
        .then((user) => {
            let token = user.generateToken(contraseña);
            if(token != undefined){
                // Guarda el token en una cookie
                res.cookie('token', token, { httpOnly: false });
                // Redirige a la ruta '/'
                res.redirect('/');
            }else{
                res.cookie('token', -1, { httpOnly: false });
                res.status(404).json({ error: 'usuario o contraseña incorrectos' });
            }
        })
        .catch(err =>{
            res.cookie('token', -1, { httpOnly: false });
            res.status(404).json({ error: 'usuario o contraseña incorrectos' });
        })
        
}

async function register(req, res){
    let newUsuario = {
        _nombre: req.body.nombre,
        _apellido: req.body.apellido,
        _correo: req.body.correo,
        _contraseña: req.body.contraseña,
        _imagen: req.body.imagen,
        _fechaNacimiento: new Date(req.body.fechaNacimiento),
        _telefono: req.body.telefono,
        _animales: [],
        _publicaciones: []
    };
    try {
        
        const us = await User.findOne({ _correo: newUsuario._correo });
        if (us === null) {
            let usuario = Usuario.createFromObject(newUsuario);
            let usuarioMongoose = User(usuario);
        
            // Guardamos el usuario en nuestra base de datos
            usuarioMongoose.save()
            res.redirect('/');
        }
    } catch (error) {
        console.error(error)
        res.status(400);
        res.type('text/plain');
        res.send(error);
    }
}

// ANIMALES
function getAnimals(){
    Animal.find({}).then(animal => res.status(200).json(animal));
}

function getAnimalById(AnimalId){
    // let animal = animals.find(a=> AnimalId == a.uuid);
    // if(!animal) throw new Error("Animal not found.");
    // else return animal;
    return Animal.findOne({ _id: `${AnimalId}` }).then(animal => {
        return animal;
    });

}


async function createAnimal(req, res){
    let userMongoose = await veryfyToken(req.cookies.token);
    let newAnimal = {
        _nombre: req.body._nombre,
        _tipo: req.body._tipo,
        _imagen: req.body._imagen,
        _raza: (req.body._raza === undefined) ? '' : req.body._raza,
        _sexo: req.body._sexo,
        _caracter: req.body._caracter,
        _edad: [parseInt(req.body._edadValor), (req.body._edadUnidad === undefined) ? '' : req.body._edadUnidad],
        _ubicacion: req.body._ubicacion,
        _pelajeTipo: req.body._pelajeTipo,
        _pelajeColor: req.body._pelajeColor,
        _pelajeLargo: req.body._pelajeLargo,
        _estirilizado: ((req.body._estirilizado === "si") ? true : false),
        _fechaDesparasitacion: req.body._fechaDesparasitacion,
        _vacunas: (req.body._vacunas === undefined) ? [] : (Array.isArray(req.body._vacunas)) ? req.body._vacunas : [req.body._vacunas],
        _paracitos: (req.body._parasitos === undefined) ? [] : (Array.isArray(req.body._parasitos) ? req.body._parasitos : [req.body._parasitos]),
        _enfermedades: req.body._enfermedades,
        _discapacidades: req.body._discapacidades,
        _estado: false,
        _correoUser: userMongoose._correo
    };


    try {
        let animal = AnimalClass.createFromObject(newAnimal); // Convertir a objeno animal de nuestra clase
        let animalMongoose = Animal(animal); // Convertir a objeto animal de la base de datos
        animalMongoose.save(); // Guardo el animal en la base de datos


        let user = await getUserByEmail2(userMongoose._correo);
        let animales = user._animales;

        animales.push(animalMongoose._id);
        updateUser(userMongoose._correo, { _animales: animales });

        // Guardamos el usuario en nuestra base de datos

        res.redirect('/perfil');
    } catch (error) {
        res.status(400).send(error);
    }

    // let a;
    // if(typeof animal === 'string'){
    //     a= Animal.createFromJson(animal);
    //     animals.push(a);
    // }else{
    //     a = Animal.createFromObject(animal);
    //     animals.push(a);
    // }
    // return a;
}

//----------------------------------------------------------------------------------------------------
function updateUser(correo, updatedUser) {
    User.findOneAndUpdate({ _correo: `${correo}` }, updatedUser, { new : true }).then(user => {
        return user;
    });
}
//-------------------------------------------------------------------------------------------------------------

function updateAnimal(req, res){
    let animalId = req.params.idAnimal;
    let updateAnimal = req.body;
    Animal.findOneAndUpdate({ _id: `${animalId}` }, updateAnimal, { new : true }).then(animal => {
        res.status(200).json(animal);
    });

}

async function deleteAnimal(req, res){
    try {
        // Obtenemos el correo del usuario al mismo tiempo que lo verificamos (sacamos el correo del token)
        let userMongoose = await veryfyToken(req.cookies.token);
        let user = await getUserByEmail2(userMongoose._correo); // Obtenemos el usuario de mongodb

        let animales = user._animales; //Obtenemos los animales que tiene ese usuario
        let index = await animales.findIndex(a => {
            return (a == req.params.idAnimal);
        }); // Buscamos el animal que queremos eliminar

        if (index != -1){
            animales.splice(index,1); // Eliminamos el animal de la lista de animales del usuario
            updateUser(userMongoose._correo, { _animales: animales}); // Actualizamos la lista de animales del usuario de mongodb
    
            let animalEliminado = await Animal.findOneAndDelete({ _id: `${req.params.idAnimal}` }); // Eliminamos el animal de mongodb

            res.status(200).send("Animal eliminado");
        } else {
            res.status(404).send("Animal no encontrado");
        }


    } catch (err) {
        console.error(err);
        res.status(500).send("Error al eliminar el animal");
    }
}


// USERS
async function getUsers(req, res){
    User.find({}).then(users => res.status(200).json(users));
}

function getUserByEmail(req, res){
    User.findOne({ _correo: `${req.params.correoUser}` }).then(user => res.status(200).json(user));
}

function getUserByEmail2(correo){
    return User.findOne({ _correo: `${correo}` }).then(user => {
        return user;
    });
}

// function createUser(user){
//     let u;
//     if(typeof user === 'string'){
//         u = Usuario.createFromJson(user);
//         users.push(u);
//     }else{
//         u = Usuario.createFromObject(user);
//         users.push(u);
//     }
//     return u;
// }

// function updateUser(userId, updateUser){
//     let userToUpdate = getAnimalById(userId);
//     if (userToUpdate) {
//         Object.assign(userToUpdate, updateUser);
//     }
// }

function deleteUser(req, res){
    let correo = req.params.correoUser;

    try {
        
        User.findOneAndDelete({ _correo: `${correo}` }).then(user => {

            let deleteAnimals = user._animales.map(animal => {
                return Animal.findOneAndDelete({ _id: `${animal}` });
            });

            let deletePublications = user._publicaciones.map(publicacion => {
                return Publicacion.findOneAndDelete({ _id: `${publicacion}` });
            });

            Promise.all([...deleteAnimals, ...deletePublications]).then(() => {
                res.status(200)
                .type('text/plain; charset=utf-8')
                .send(user != undefined ? `Usuario ${user._nombre} se elimino!` : `No se encontro ningun usuario con el correo ${correo}!`);
            });

        });

    } catch (error) {
        res.status(400).send(error);
    }

}


// ADMINISTRADORES
function getAdmins(){
    return admins;
}

function getAdminById(AdminId){
    let admin = admins.find(a=> AdminId == a.uuid);
    if(!admin) throw new Error("Admin not found.");
    else return admin;
}

function createAdmin(admin){
    let a;
    if(typeof admin === 'string'){
        a = Admin.createFromJson(admin);
        admins.push(a);
    }else{
        a = Admin.createFromObject(admin);
        admins.push(a);
    }
    return a;
}

function updateAdmin(AdminlId, updateAdmin){
    let adminToUpdate = getAnimalById(AdminlId);
    if (adminToUpdate) {
        Object.assign(adminToUpdate, updateAdmin);
    }
}




// PUBLICACIONES
function getPublicaciones(){
    return publicaciones;
}

function getPublicacionById(publicacionId){
    let publicacion = publicaciones.find(p=> publicacionId == p.uuid);
    if(!publicacion) throw new Error("Publicacion not found.");
    else return publicacion;
}

async function createPublicacion(req, res){
    
    try {    
        
        let token = await veryfyToken(req.cookies.token);
        let user = await getUserByEmail2(token._correo);
        let newPublicacion = {
            _titulo: req.body._titulo,
            _contenido: req.body._contenido,
            _imagen: req.body._imagen,
            _autorNombre: user._nombre,
            _autorImagen: user._imagen,
        }

        let publicacion = PublicacionClass.createFromObject(newPublicacion); // Convertir a objeno animal de nuestra clase
        let publicacionMongoose = Publicacion(publicacion); // Convertir a objeto animal de la base de datos
        publicacionMongoose.save(); // Guardo el animal en la base de datos


        let publicaciones = user._publicaciones;

        publicaciones.push(publicacionMongoose._id);
        updateUser(user._correo, { _publicaciones: publicaciones });

        // Guardamos el usuario en nuestra base de datos

        res.redirect('/perfil');
    } catch (error) {
        res.status(400).send(error);
    }
}

async function deletePublicacion(req, res){
    try {
        // Obtenemos el correo del usuario al mismo tiempo que lo verificamos (sacamos el correo del token)
        let token = await veryfyToken(req.cookies.token);
        let user = await getUserByEmail2(token._correo); // Obtenemos el usuario de mongodb

        let publicaciones = user._publicaciones; //Obtenemos los animales que tiene ese usuario
        let index = await publicaciones.findIndex(p => {
            return (p == req.params.idPublicacion);
        }); // Buscamos el animal que queremos eliminar


        if (index != -1){
            publicaciones.splice(index,1); // Eliminamos el animal de la lista de animales del usuario
            updateUser(user._correo, { _publicaciones: publicaciones}); // Actualizamos la lista de animales del usuario de mongodb
    
            let publicacionEliminada = await Publicacion.findOneAndDelete({ _id: `${req.params.idPublicacion}`}); // Eliminamos el animal de mongodb

            res.status(200).send("Publicaciones eliminada");
        } else{
            res.status(404).send("Publicacion no encontrada");
        }

        
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al eliminar la publicacion");
    }
}


//filtro para buscar animales (para el usuario)
//tipo:raza:sexo:edadUnidad:edadValorInicial:edadValorFinal:pelajeColor:pelajeTipo:pelajeLargo:Vacunas:EPD:estirilizacion:ubicacion
async function findAnimales(query){
    // let [tipo, raza, sexo, edadUnidad, edadValorInicial, edadValorFinal, pelajeTipo, pelajeColor, pelajeLargo, vacunas, EPD, esterilizacion, ubicacion] = query.split(':');
    let consulta = {};
    if (query._tipo && !Array.isArray(query._tipo)) consulta["_tipo"] =  query._tipo;
    if (query._raza) consulta["_raza"] = query._raza;
    if (query._sexo) consulta["_sexo"] = query._sexo;
    if (query._edadUnidad) consulta["_edad.1"] = query._edadUnidad;

    if (query._edadDesde && query._edadHasta) consulta["_edad.0"] = {"$gte": parseInt(query._edadDesde), "$lte": parseInt(query._edadHasta)};


    return Animal.find(consulta)
        .then(animal => {
        return animal;
    });
}


function findUsers(req, res){
    
}


//nombre:sexo:fechaInicial:fechafinal
function findUserAdmin(query){
    let [nombre, sexo, fechaInicial, fechaFinal] = query.split(':');
    let queryNombre = nombre? nombre.trim().toLowerCase() : '';
    let querySexo = sexo? sexo.trim().toLowerCase() : '';
    let queryFechaInicial = fechaInicial? fechaInicial : '';
    let queryFechaFinal = fechaFinal? fechaFinal : '';
    
    return users.filter(user => {
        let userNombre = user.nombre.toLowerCase();
        let userSexo = user.sexo.toLowerCase();
        let userFechaInicial = user.fechaNacimiento;
        let userFechaFinal = user.fechaNacimiento;

        return (
            (queryNombre === '' || userNombre.includes(queryNombre)) &&
            (querySexo === '' || userSexo === querySexo) &&
            (queryFechaInicial === '' || userFechaInicial === queryFechaInicial) &&
            (queryFechaFinal === '' || userFechaFinal === queryFechaFinal)
        );
    });
}


//nombre:sexo:fechaInicial:fechafinal
function findAnimalAdmin(query){
    let [nombre, sexo, edadValorInicial, edadValorFinal] = query.split(':');
    let queryNombre = nombre? nombre.trim().toLowerCase() : '';
    let querySexo = sexo? sexo.trim().toLowerCase() : '';
    let queryEdadValorInicial = edadValorInicial? edadValorInicial : '';
    let queryEdadValorFinal = edadValorFinal? edadValorFinal : '';
    
    return animals.filter(animal => {
        let animalNombre = animal.nombre.toLowerCase();
        let animalSexo = animal.sexo.toLowerCase();
        let animalEdadValorInicial = animal.edad.valor;
        let animalEdadValorFinal = animal.edad.valor;

        return (
            (queryNombre === '' || animalNombre.includes(queryNombre)) &&
            (querySexo === '' || animalSexo === querySexo) 
            (queryEdadValorInicial === '' || animalEdadValorInicial >= parseInt(queryEdadValorInicial)) &&
            (queryEdadValorFinal === '' || animalEdadValorFinal <= parseInt(queryEdadValorFinal))
        );
    });
}

module.exports = {register, getUserByEmail, getUserByEmail2, logIn, createAnimal, updateAnimal, deleteAnimal, createPublicacion, deletePublicacion, findAnimales, getUsers, deleteUser};