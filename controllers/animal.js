"use strict";

class AnimalException{
    constructor(errorMessage){
        this.errorMessage = errorMessage; 
    }
}

class Animal{
    constructor(imagen, nombre, tipo, raza, sexo, caracter, edad, ubicacion, 
                pelajeTipo, pelajeColor, pelajeLargo,estirilizado, fechaDesparacitacion, 
                vacunas, parasitos, enfermedades, discapacidad, estado, correoUser){
        this.imagen = imagen;
        this.nombre = nombre;
        this.tipo = tipo;
        this.raza = raza;
        this.sexo = sexo;
        this.caracter = caracter;
        this.edad = edad; //objeto con valor y unidad
        this.ubicacion = ubicacion; //solo la ciudad (estado:Jalisco, pais: México)
        this.pelajeTipo = pelajeTipo;
        this.pelajeColor = pelajeColor;
        this.pelajeLargo = pelajeLargo;
        this.estirilizado = estirilizado; //true o false
        this.fechaDesparacitacion = fechaDesparacitacion; //format  AAAA-MM-DD
        //Colecciones de atributos que pueden ser múltiples
        this.vacunas = vacunas;//array de vacunas (puede ser solo ninguna)
        this.parasitos = parasitos;//array de parasitos (puede ser solo ninguno)
        this.enfermedades = enfermedades; //string
        this.discapacidades = discapacidad; //string
        this.estado = estado; //true o false
        this._correoUser = correoUser;
    };

    get imagen(){
        return this._imagen;
    }
    //obligatorio
    set imagen(file){
        if (/*file instanceof File*/ typeof file === "string") {
            this._imagen = file;
        } else {
            throw new AnimalException("La imagen debe ser un archivo válido.");
        }
    }
    
    get nombre(){
        return this._nombre;
    }
    //obligatorio
    set nombre(nombre){
        if(typeof nombre !== 'string' || nombre.trim() === ''){
            throw new AnimalException("El nombre del animal no puede estar vacio.");
        }else {
            this._nombre = nombre;
        }
    }

    get tipo(){
        return this._nombre;
    }
    //obligatorio
    set tipo(tipo){
        if(typeof tipo !== 'string' || tipo.trim() === ''){
            throw new AnimalException("El tipo de animal no puede estar vacio.");
        }else {
            this._tipo = tipo;
        }
    }

    get raza(){
        return this._raza;
    }
    //no obligatoria
    set raza(raza){
        this._raza = raza;
    }

    get sexo(){
        return this._nombre;
    }
    //obligatorio
    set sexo(sexo){
        if(typeof sexo !== 'string' || sexo.trim() === ''){
            throw new AnimalException("El sexo del animal no puede estar vacio.");
        }else {
            this._sexo = sexo;
        }
    }

    get ubicacion(){
        return this._ubicacion;
    }
    set ubicacion(municipio){
        if(typeof municipio === "string"){
            this._ubicacion = municipio;
        }else{
            throw new AnimalException("La ubicación tiene que ser una cadena de texto.")
        }
    }

    get caracter(){
        return this._caracter;
    }
    //no obligatoria
    set caracter(caracter){
        if(typeof caracter !== 'string'){
            throw new AnimalException("El caracter del animal debe ser un string.");
        }else {
            this._caracter = caracter;
        }
    }

    //no obligatoria
    get edad() {
        return this._edad;
    }
    //edad resive un objeto con valor y unidad
    set edad(edad) {
        if (Array.isArray(edad)) {
            if ((typeof edad[0] === "number" && edad[0] >= 0)&&(typeof edad[1] === "string") ) {
                this._edad = [edad[0], edad[1]];
            } else if (edad === null || edad === undefined || edad === '' || isNaN(edad)){
                this._edad = null;
                this._unidadEdad = null;
            }
            else {
                throw new AnimalException("La edad del animal debe ser un número positivo.");
            }
        } else {
            throw new AnimalException("La edad del animal debe ser una lista");
        }
    }

    get pelajeColor(){
        return this._pelajeColor;
    }
    //no obligatoria
    set pelajeColor(color){
        if(typeof color !== 'string'){
            throw new AnimalException("El color de pelaje del animal debe ser un string.");
        }else {
            this._pelajeColor = color;
        }
    }

    get pelajeLargo(){
        return this._pelajeLargo;
    }
    //no obligatoria
    set pelajeLargo(largo){
        if(typeof largo !== 'string'){
            throw new AnimalException("El largo de pelaje del animal debe ser un string.");
        }else {
            this._pelajeLargo = largo;
        }
    }

    get pelajeTipo(){
        return this._pelajeTipo;
    }
    //no obligatoria
    set pelajeTipo(tipo){
        if(typeof tipo !== 'string'){
            throw new AnimalException("El tipo de pelaje del animal debe ser un string.");
        }else {
            this._pelajeTipo = tipo;
        }
    }

    get estirilizado(){
        return this._estirilizado;
    }
    //no obligatoria
    set estirilizado(value){
        if(typeof value !== 'boolean'){
            throw new AnimalException("El valor de estirilización del animal debe ser un boolean.");
        }else {
            this._estirilizado = value;
        }
    }

    get fechaDesparacitacion(){
        return this._fechaDesparacitacion;
    }
    //no obligatoria
    set fechaDesparacitacion(date){
        let auxDate=new Date(date);
        if(auxDate instanceof Date){
            this._fechaDesparacitacion = date;
        }else if(date === "null" || date ===''||date===undefined) {
            this._fechaDesparacitacion = null;
        }else{
            throw new AnimalException("El la fecha de desparacitación del animal debe tener un formato valido.");
        }
    }

    get vacunas(){
        return this._vacunas;
    }
    //obligatoria (pueden poner la opcion ninguna)
    set vacunas(vacunas) {
        if (Array.isArray(vacunas)) {
            this._vacunas = vacunas;
        } else {
            throw new AnimalException("Las vacunas deben ser una lista.");
        }
    }

    get parasitos(){
        return this._parasitos;
    }
    //obligatoria (pueden poner la opcion ninguna)
    set parasitos(parasitos) {
        if (Array.isArray(parasitos)) { 
            this._parasitos = parasitos;    
        } else {
            throw new AnimalException("Los parásitos deben ser una lista.");
        }
    }

    get enfermedades(){
        return this._enfermedades;
    }
    //no obligatoria
    set enfermedades(enfermedades){
        if(typeof enfermedades !== 'string'){
            throw new AnimalException("La descripción de la enfermedad del animal debe ser un string.");
        }else {
            this._enfermedades = enfermedades;
        }
    }

    get discapacidad(){
        return this._discapacidad;
    }
    //no obligatoria
    set discapacidad(discapacidad){
        if(typeof discapacidad !== 'string'){
            throw new AnimalException("La descripción de la discapacidad del animal debe ser un string.");
        }else {
            this._discapacidad = discapacidad;
        }
    }

    get estado(){
        return this._estado;
    }
    //default es false se cambia solo en el modal de editar perfil 
    set estado(value){
        if(typeof value !== 'boolean'){
            throw new AnimalException("El valor de esatdo de adopción del animal debe ser un boolean.");
        }else {
            this._estado = value;
        }
    }

    get correoUser(){
        return this._correoUser;
    }

    set correoUser(correo){
        if(typeof correo !== 'string'){
            throw new AnimalException("El correo del usuario debe ser un string.");
        }else {
            this._correoUser = correo;
        }
        
    }
    
    static createFromJson(jsonValue){
        let obj = JSON.parse(jsonValue);
        return Animal.createFromObject(obj);
    }

    static createFromObject(obj){
        let newAnimal = {};
        Object.assign(newAnimal, obj);//clona el objeto original, y maneja cualquier valor que no sea objeto
        Animal.cleanObject(newAnimal);
        let animal  = new Animal(
            newAnimal._imagen, 
            newAnimal._nombre, 
            newAnimal._tipo,
            newAnimal._raza,
            newAnimal._sexo,
            newAnimal._caracter,
            newAnimal._edad,
            newAnimal._ubicacion,
            newAnimal._pelajeTipo,
            newAnimal._pelajeColor,
            newAnimal._pelajeLargo,
            newAnimal._estirilizado,
            newAnimal._fechaDesparacitacion,
            newAnimal._vacunas, 
            newAnimal._parasitos, 
            newAnimal._enfermedades,
            newAnimal._discapacidad,
            newAnimal._estado
        ); 
        return animal;
    }

    static cleanObject(obj){
        let properties = ['_imagen', '_nombre', '_tipo', '_raza', '_sexo', '_caracter', '_edad', '_ubicacion', 
                '_pelajeTipo', '_pelajeColor', '_pelajeLargo','_estirilizado', '_fechaDesparacitacion', 
                '_vacunas', '_parasitos', '_enfermedades', '_discapacidad', '_estado']
        for (let prop in obj) {
            if(!properties.includes(prop)){
                delete obj[prop];
            }
        }  
        return obj;
    }
}

module.exports = Animal;