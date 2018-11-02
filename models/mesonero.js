'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mesoneroSchema = Schema({
    nombre:String,
    apellido:String,
    cedula:String,
    email:String,
    password:String
});

module.exports= mongoose.model('mesonero', mesoneroSchema);