"use strict";


class PublicacionExcepcion {
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

class Publicacion {
    constructor(titulo, contenido, imagen, autor, autorImagen) {
        this.titulo = titulo;
        this.contenido = contenido;
        this.autor = autor;
        this.imagen = imagen;
        this.autorImagen = autorImagen;
    }

    get autorImagen(){
        return this._autorImagen;
    }

    set autorImagen(value){
        this._autorImagen = value;
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

    get autor() {
        return this._autor;
    }

    set autor(value){
        if(typeof value === "string"){
            this._autor = value;
        }else{
            throw new PublicacionExcepcion("Autor debe ser un string")
        }
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
            newPublicacion._autor,
            newPublicacion._autorImagen
        );
        
        return publicacion;
    }

    static cleanObject(obj) {
        const publicacionProperties = ['_titulo', '_contenido', '_autor', '_imagen', '_autorImagen'];

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