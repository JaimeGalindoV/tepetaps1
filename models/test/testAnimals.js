
// Importamos mongoose
const mongoose = require('mongoose');
const AnimalMongoose = require('../animals');
const Animal = require('../../controllers/animal');

// Creamos un Usuario nuevo
let newAnimal = {
    _nombre: "Pepe",
    _tipo: "Perro",
    _imagen: "https://i.pinimg.com/564x/a4/3b/cd/a43bcd47b0c20ba05b2848f74d41e74f.jpg",
    _raza: "Labrador",
    _sexo: "Macho",
    _caracter: "Amigable",
    _edad: [2, "años"],
    _ubicacion: "CDMX",
    _pelajeTipo: "Corto",
    _pelajeColor:"otro",
    _pelajeLargo: "Corto",
    _estirilizado: false,
    _fechaDesparasitacion: new Date(2021, 0, 1),
    _vacunas: [],
    _parasitos: [],
    _enfermedades: "",
    _discapacidad: "",
    _estado: false,
};


let animal = Animal.createFromObject(newAnimal);
console.log(animal);

let animalMongoose = AnimalMongoose(animal);

// // Guardamos el alumno en nuestra AlumnosDB
animalMongoose.save()
