"use strict";


class PublicacionExcepcion {
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

class Publicacion {
    constructor(titulo, contenido, imagen, autorImagen, autorNombre) {
        this.titulo = titulo;
        this.contenido = contenido;
        this.imagen = imagen;
        this.autorImagen = autorImagen;
        this.autorNombre = autorNombre;
    }

    get autorImagen(){
        return this._autorImagen;
    }

    set autorImagen(value){
        this._autorImagen = value;
    }

    get autorNombre(){
        return this._autorNombre;
    }

    set autorNombre(value){
        this._autorNombre = value;
    }


    get titulo() {
        return this._titulo;
    }

    set titulo(titulo) {
        this._titulo = titulo;
    }

    get imagen(){
        return this._imagen;
    }

    set imagen(value){
        if(typeof value === "string"){
            this._imagen = value;
        }else{
            throw new PublicacionExcepcion("Imagen debe ser un string");
        }
    }

    get contenido() {
        return this._contenido;
    }

    set contenido(contenido) {
        // Verificar si el contenido está presente
        if (!contenido || contenido.trim().length === 0) {
            throw new Error("El contenido de la publicación no puede estar vacío.");
        }

        // Si el contenido está presente, se establece
        this._contenido = contenido.trim();
    }


    static createFromJson(jsonValue) {
        let obj = JSON.parse(jsonValue);
        return Publicacion.createFromObject(obj);
    }

    static createFromObject(obj) {
        let newPublicacion = {};
        Object.assign(newPublicacion, obj);
        Publicacion.cleanObject(newPublicacion);
        let publicacion = new Publicacion(
            newPublicacion._titulo,
            newPublicacion._contenido,
            newPublicacion._imagen,
            newPublicacion._autorImagen,
            newPublicacion._autorNombre
        );
        
        return publicacion;
    }

    static cleanObject(obj) {
        const publicacionProperties = ['_titulo', '_contenido', '_imagen', '_autorImagen', '_autorNombre'];

        for (let prop in obj) {
            let exist = false;
            for (let property of publicacionProperties) {
                if (prop === property) {
                    exist = true;
                    break;
                }
            }
            if (!exist) delete obj[prop];
        }
    }
}

module.exports = Publicacion;