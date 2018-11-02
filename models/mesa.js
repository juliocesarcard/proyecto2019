'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mesaSchema = Schema({
   status:Boolean
})

module.exports= mongoose.model('mesa', mesaSchema);