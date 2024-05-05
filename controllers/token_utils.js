"use strict";

const jwt = require('jsonwebtoken');

let privateKey = "ABC123#";

async function veryfyToken(token){

    
    if(token === undefined || token === -1 || token === ''){
        return false;   
    }

    let decodedReturn;
    jwt.verify(token,privateKey,(err,decoded)=>{
        if(err) decodedReturn = false;
        else decodedReturn = decoded;
    });
    return decodedReturn;
}

exports.veryfyToken = veryfyToken;