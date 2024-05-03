"use strict"

class AdminExcepcion {
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

class Admin{
    constructor(correo, contraseña){
        this.correo = correo;
        this.contraseña = contraseña;
    }

    get correo(){
        return this._correo;
    }

    set correo(correo){
        // Verificar si el correo es válido
        let regexCorreo = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if(!regexCorreo.test(correo)){
            throw new AdminExcepcion("Por favor, introduce un correo válido.");
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
            throw new AdminExcepcion("La contraseña debe tener al menos 8 caracteres.");
        }
        
        // Verificar la presencia de letras mayúsculas
        if(!(/[A-Z]/.test(contraseña))){
            throw new AdminExcepcion("La contraseña debe contener al menos una letra mayúscula.");
        }
        
        // Verificar la presencia de letras minúsculas
        if(!(/[a-z]/.test(contraseña))){
            throw new AdminExcepcion("La contraseña debe contener al menos una letra minúscula.");
        }
        
        // Verificar la presencia de números
        if(!(/[0-9]/.test(contraseña))){
            throw new AdminExcepcion("La contraseña debe contener al menos un número.");
        }
    
        // Si la contraseña pasa todas las verificaciones, se establece
        this._contraseña = contraseña;
    }


    static createFromJson(JsonValue) {
        let obj = JSON.parse(JsonValue);
        return Admin.createFromObject(obj);
    }

    static createFromObject(obj) {
        let newAdmin = {};
        Object.assign(newAdmin, obj);
        Admin.cleanObject(newAdmin);

        let admin = new Admin(
            newAdmin._correo,
            newAdmin._contraseña,
        );

        return admin;
    }

    static  cleanObject(obj) {
        const adminProperties = ['_correo', '_contraseña'];

        for (let prop in obj) {
            let exist = false;
            for (let property of adminProperties) {
                if (prop === property) {
                    exist = true;
                    break;
                }
            }
            if (!exist) delete obj[prop];
        }
    }
    
}

module.exports = Admin;
