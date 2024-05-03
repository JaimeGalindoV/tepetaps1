
// Importamos mongoose
const Publication = require('../publicaciones');
const Publicacion = require('../../controllers/publicacion');

// Creamos un Usuario nuevo
let newPublicacion = {
    _titulo: "Pepe",
    _contenido: "Perro",
    _imagen: "https://img.buzzfeed.com/buzzfeed-static/static/2019-02/5/11/asset/buzzfeed-prod-web-04/sub-buzz-6425-1549385950-7.jpg",
    _autor: "Juan"
};

let publicacion = Publicacion.createFromObject(newPublicacion);

let publicacionMongoose = Publication(publicacion);

// // Guardamos el alumno en nuestra AlumnosDB
publicacionMongoose.save()
