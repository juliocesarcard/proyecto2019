'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pedidoSchema = Schema({
    idMesa:{type: Schema.ObjectId, ref: 'mesa'},
    idMesonero:{type: Schema.ObjectId, ref: 'mesonero'},
    descripcion:String
});

module.exports= mongoose.model('pedido', pedidoSchema);