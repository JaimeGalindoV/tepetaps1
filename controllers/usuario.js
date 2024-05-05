"use strict"

class UsuarioExcepcion {
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

class Usuario {
    constructor(nombre, apellido, correo, contraseña, fechaNacimiento, telefono, imagen){
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.contraseña = contraseña;
        this.fechaNacimiento = fechaNacimiento;
        this.telefono = telefono;
        this.imagen = imagen;
        this._animales = [];
        this._publicaciones = [];

    }

    get nombre(){
        return this._nombre;
    }

    set nombre(nombre){
        if(typeof nombre !== 'string'){
            throw new UsuarioExcepcion("El nombre debe ser una cadena de caracteres.");
        }
        this._nombre = nombre;
    }

    get apellido(){
        return this._apellido;
    }

    set apellido(apellido){
        if(typeof apellido !== 'string'){
            throw new UsuarioExcepcion("El apellido debe ser una cadena de caracteres.");
        }
        this._apellido = apellido;
    }

    get fechaNacimiento(){
        return this._fechaNacimiento;
    }

    set fechaNacimiento(fechaNacimiento){
        // Crear un objeto Date con la fecha de nacimiento
        let fechaNac = new Date(fechaNacimiento);

        // Si la persona es mayor de edad, establecer la fecha de nacimiento
        this._fechaNacimiento = fechaNac;
    }
    
    get correo(){
        return this._correo;
    }

    set correo(correo){
        // Verificar si el correo es válido
        let regexCorreo = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if(!regexCorreo.test(correo)){
            throw new UsuarioExcepcion("Por favor, introduce un correo válido.");
        }
    
        // Si el correo es válido, se establece
        this._correo = correo;
    }
    
    get contraseña(){
        return this._contraseña
    }
    
    set contraseña(contraseña){
        // Verificar la longitud de la contraseña
        if(contraseña.length < 8){
            throw new UsuarioExcepcion("La contraseña debe tener al menos 8 caracteres.");
        }
        
        // Verificar la presencia de letras mayúsculas
        if(!(/[A-Z]/.test(contraseña))){
            throw new UsuarioExcepcion("La contraseña debe contener al menos una letra mayúscula.");
        }
        
        // Verificar la presencia de letras minúsculas
        if(!(/[a-z]/.test(contraseña))){
            throw new UsuarioExcepcion("La contraseña debe contener al menos una letra minúscula.");
        }
        
        // Verificar la presencia de números
        if(!(/[0-9]/.test(contraseña))){
            throw new UsuarioExcepcion("La contraseña debe contener al menos un número.");
        }
    
        // Si la contraseña pasa todas las verificaciones, se establece
        this._contraseña = contraseña;
    }

    get telefono(){
        return this._telefono;
    }

    set telefono(telefono){
        // Verificar si el teléfono es una cadena de caracteres
        if(typeof telefono !== 'string'){
            throw new UsuarioExcepcion("El teléfono debe ser una cadena de caracteres.");
        }

        // Verificar si el teléfono tiene 10 dígitos


        this._telefono = telefono;
    }

    get imagen(){
        return this._imagen;
    }

    set imagen(file){
        if (/*file instanceof File*/ typeof file === "string") {
            this._image = file;
        } else {
            throw new UsuarioExcepcion("La imagen debe ser un archivo válido.");
        }
    }


    get animales(){
        return this._animales;
    }
    
    set animales(value){
        this._animal = [];
        if(typeof value === 'string') {
            let jsonValue = JSON.parse(value).split('\n');
            for(let i = 0; i<jsonValue.length;i++){
                this._animal.push(Animal.createFromObject(jsonValue[i]));
            }
        }
        //si value es array -> for and create
        else if(Array.isArray(value)){
            for (let i=0; i < value.length ; i++) { 
                if(typeof value[i] === 'string'){
                    let jsonValue = JSON.parse(value[i]);
                    this._animal.push(Animal.createFromObject(jsonValue));   
                }else{
                    this._animal.push(Animal.createFromObject(value[i]));
                }
            };
        }
        //single element : no string y no array ->create
        else if(typeof value !== "string" &&  !Array.isArray(value)) {
            this._animal.push(Animal.createFromObject(value));
        }
    }


    get publicaciones(){
        return this._publicaciones;
    }
    
    set publicaciones(value){
        this._publicacion = [];
        if(typeof value === 'string') {
            let jsonValue = JSON.parse(value).split('\n');
            for(let i = 0; i<jsonValue.length;i++){
                this._publicacion.push(Publicacion.createFromObject(jsonValue[i]));
            }
        }
        //si value es array -> for and create
        else if(Array.isArray(value)){
            for (let i=0; i < value.length ; i++) { 
                if(typeof value[i] === 'string'){
                    let jsonValue = JSON.parse(value[i]);
                    this._publicacion.push(Publicacion.createFromObject(jsonValue));   
                }else{
                    this._publicacion.push(Publicacion.createFromObject(value[i]));
                }
            };
        }
        //single element : no string y no array ->create
        else if(typeof value !== "string" &&  !Array.isArray(value)) {
            this._publicacion.push(Publicacion.createFromObject(value));
        }
    }

    // ADD, UPDATE, REMOVE ANIMAL
    addAnimal(animalUuid){
        let animalAdd = this._animales.find(a => a.uuid === animalUuid);
        if (animalAdd) {
            throw new UsuarioExcepcion('El animal ya existe.')
        } else {
            this._animales.push(animalAdd);
        }
    }

    updateAnimal(animalUuid, newAnimal) {
        let animalUpdate = this._animales.find(a => a.uuid === animalUuid);
        if (animalUpdate !== undefined) {
            Object.assign(animalUpdate, newAnimal);
        } else {
            throw new UsuarioExcepcion("Este animal no está asignado al usuario.");
        }
    } 

    removeAnimal(animalUuid){
        if(!this._animales.find(a =>a.uuid === animalUuid)){
            throw new Usuario("Este animal no está asignado al usuario.");
        }
        let index = this._animales.findIndex(a =>a.uuid === animalUuid);
        this._animales.splice(index,1);
    }

    // ADD, REMOVE PUBLICACION
    addPublicacion(publicacionUuid){
        let publicacionAdd = this._publicaciones.find(p => p.uuid === publicacionUuid);
        if (publicacionAdd) {
            throw new UsuarioExcepcion('La publicación ya existe.')
        } else {
            this._publicaciones.push(publicacionAdd);
        }
    }

    removePublicacion(publicacionUuid){
        if(!this._publicaciones.find(p =>p.uuid === publicacionUuid)){
            throw new Usuario("Esta publicación no está asignada al usuario.");
        }
        let index = this._publicaciones.findIndex(p =>p.uuid === publicacionUuid);
        this._publicaciones.splice(index,1);
    }

    static cleanObject(obj) {
        const UserProperties = ['_nombre', '_apellido', '_fechaNacimiento', '_correo', '_contraseña', '_telefono', '_imagen'];

        for (let prop in obj) {
            let exist = false;
            for (let property of UserProperties) {
                if (prop === property) {
                    exist = true;
                    break;
                }
            }
            if (!exist) delete obj[prop];
        }
    }


    static createFromJson(JsonValue) {
        let obj = JSON.parse(JsonValue);
        return Usuario.createFromObject(obj);
    }

    static createFromObject(obj) {
        
        let newUsuario = {};
        Object.assign(newUsuario, obj);
        Usuario.cleanObject(newUsuario);
        
        let usuario = new Usuario(
            newUsuario._nombre,
            newUsuario._apellido,
            newUsuario._correo,
            newUsuario._contraseña,
            newUsuario._fechaNacimiento,
            newUsuario._telefono,
            newUsuario._imagen
        );
        
        return usuario;
    }

    
}

module.exports = Usuario;