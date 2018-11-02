'use strict'

var jwt = require ('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta';

exports.createToken = function (mesonero){
    var payload = {
        sub: mesonero._id,
        nombre:mesonero.nombre,
        apellido:mesonero.apellido,
        cedula:mesonero.cedula,
        iat: moment().unix(),
        exp: moment().add(30,'days').uniix

    };
    return jwt.encode(payload, secret);
};