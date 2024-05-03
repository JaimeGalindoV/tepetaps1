"use strict";


let animals = [];
let admins = [];
let publicaciones = [];

const User = require('../models/users')
const Usuario = require('./usuario');


function logIn(req, res){
    let email = req.body.email;
    let password = req.body.password;
    
    // Verifica si el usuario existe en la base de datos
    User.findOne({ email: `${email}` })
        .then((user) => {
            let token = user.generateToken(password);
            if(token != undefined){
                res.status(200);
                res.type( 'text/plain' );
                res.send(token)
            }else{
                res.status(401);
                res.type( 'text/plain' );
                res.send("Wrong email or password")
            }
        })
        .catch(err =>{
            res.status(400);
            res.type( 'text/plain' );
            res.send("Wrong email or password")
        })
        
}


async function register(req, res){

    let newUsuario = {
        _nombre: req.body.nombre,
        _apellido: req.body.apellido,
        _correo: req.body.correo,
        _telefono: req.body.telefono,
        _contraseña: req.body.contraseña,
        _fechaNacimiento: new Date(req.body.fechaNacimiento),
        _imagen: req.body.imagen,
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
        console.log(error)
        res.status(400);
        res.type('text/plain');
        res.send(error);
    }
}

// ANIMALES
function getAnimals(){
    return animals;
}

function getAnimalById(AnimalId){
    let animal = animals.find(a=> AnimalId == a.uuid);
    if(!animal) throw new Error("Animal not found.");
    else return animal;
}

function createAnimal(animal){
    let a;
    if(typeof animal === 'string'){
        a= Animal.createFromJson(animal);
        animals.push(a);
    }else{
        a = Animal.createFromObject(animal);
        animals.push(a);
    }
    return a;
}

function updateAnimal(AnimalId, updateAnimal){
    let animalToUpdate = getAnimalById(AnimalId);
    if (animalToUpdate) {
        Object.assign(animalToUpdate, updateAnimal);
    }
}

function deleteAnimal(AnimalId){
    let index = animals.findIndex(a =>a.uuid === AnimalId);
    animals.splice(index,1);
}


// USERS
function getUsers(req, res){
    User.find({}).then(users => res.status(200).json(users));
}

function getUserByEmail(req, res){
    let correo = req.query.correo;
    User.findOne({ _correo: `${correo}` }).then(user => res.status(200).json(user));
}

function createUser(user){
    let u;
    if(typeof user === 'string'){
        u = Usuario.createFromJson(user);
        users.push(u);
    }else{
        u = Usuario.createFromObject(user);
        users.push(u);
    }
    return u;
}

function updateUser(userId, updateUser){
    let userToUpdate = getAnimalById(userId);
    if (userToUpdate) {
        Object.assign(userToUpdate, updateUser);
    }
}

function deleteUser(userId){
    let index = users.findIndex(u =>u.uuid === userId);
    users.splice(index,1);
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

function deleteAnimal(AdminId){
    let index = admins.findIndex(a =>a.uuid === AdminId);
    admins.splice(index,1);
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

function createPublicacion(publicacion){
    let p;
    if(typeof publicacion === 'string'){
        p = Publicacion.createFromJson(publicacion);
        publicaciones.push(p);
    }else{
        p = Publicacion.createFromObject(publicacion);
        publicaciones.push(p);
    }
    return p;
}

function deleteAnimal(publicacionId){
    let index = publicaciones.findIndex(p =>p.uuid === publicacionId);
    publicaciones.splice(index,1);
}


//filtro para buscar animales (para el usuario)
//tipo:raza:sexo:edadUnidad:edadValorInicial:edadValorFinal:pelajeColor:pelajeTipo:pelajeLargo:Vacunas:EPD:estirilizacion:ubicacion
function findAnimales(query){
    let [tipo, raza, sexo, edadUnidad, edadValorInicial, edadValorFinal, pelajeTipo, pelajeColor, pelajeLargo, vacunas, EPD, esterilizacion, ubicacion] = query.split(':');
    let queryTipo = tipo? tipo.trim().toLowerCase() : '';
    let queryRaza = raza? raza.trim().toLowerCase() : '';
    let querySexo = sexo? sexo.trim().toLowerCase() : '';
    let queryEdadUnidad = edadUnidad? edadUnidad.trim().toLowerCase() : '';
    let queryEdadValorInicial = edadValorInicial? edadValorInicial : '';
    let queryEdadValorFinal = edadValorFinal? edadValorFinal : '';
    let queryPelajeTipo = pelajeTipo? pelajeTipo.trim().toLowerCase() : '';
    let queryPelajeColor = pelajeColor? pelajeColor.trim().toLowerCase() : '';
    let queryPelajeLargo = pelajeLargo? pelajeLargo.trim().toLowerCase() : '';
    let queryVacunas = vacunas? vacunas.trim().toLowerCase() : '';
    let queryEPD = EPD? EPD.trim().toLowerCase() : '';
    let queryEsterilizacion = esterilizacion? esterilizacion.trim().toLowerCase() : '';
    let queryUbicacion = ubicacion? ubicacion.trim().toLowerCase() : '';
  
    return animals.filter(animal => {
        let animalTipo = animal.tipo.toLowerCase();
        let animalRaza = animal.raza.toLowerCase();
        let animalSexo = animal.sexo.toLowerCase();
        let animalEdadUnidad = animal.edad.unidad.toLowerCase();
        let animalEdadValorInicial = animal.edad.valor;
        let animalEdadValorFinal = animal.edad.valor;
        let animalPelajeTipo = animal.pelajeTipo.toLowerCase();
        let animalPelajeColor = animal.pelajeColor.toLowerCase();
        let animalPelajeLargo = animal.pelajeLargo.toLowerCase();
        let animalVacunas = ((animal.vacunas.lenght > 0) && (!animal.vacunas.includes('no')) ? 'si' : '');
        let animalEPD = (((animal.parasitos.lenght > 0) && (!animal.parasitos.includes('no')) || (animal.enfermedades.toLowerCase().trim() !== '' ) || (animal.discapacidades.toLowerCase().trim() !== ''))? 'si' : '');
        let animalEsterilizacion = animal.estirilizado.toLowerCase();
        let animalUbicacion = animal.ubicacion.toLowerCase();
        return (
            (queryTipo === '' || animalTipo.includes(queryTipo)) &&
            (queryRaza === '' || animalRaza.includes(queryRaza)) &&
            (querySexo === '' || animalSexo === querySexo) &&
            (queryEdadUnidad === '' || animalEdadUnidad === queryEdadUnidad) &&
            (queryEdadValorInicial === '' || animalEdadValorInicial >= parseInt(queryEdadValorInicial)) &&
            (queryEdadValorFinal === '' || animalEdadValorFinal <= parseInt(queryEdadValorFinal)) &&
            (queryPelajeTipo === '' || animalPelajeTipo === queryPelajeTipo) &&
            (queryPelajeColor === '' || animalPelajeColor === queryPelajeColor) &&
            (queryPelajeLargo === '' || animalPelajeLargo === queryPelajeLargo) &&
            (queryVacunas === '' || animalVacunas === queryVacunas) &&
            (queryEPD === '' || animalEPD === queryEPD) &&
            (queryEsterilizacion === '' || animalEsterilizacion === queryEsterilizacion) &&
            (queryUbicacion === '' || animalUbicacion === queryUbicacion)
        );
    });
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

module.exports = {register, getUserByEmail};