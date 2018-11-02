'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

    //Carga de rutas
var mesonero_routes = require('./routes/mesonero');
var mesa_routes = require('./routes/mesa');
;
var pedido_routes = require('./routes/pedido');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configurar cabeceras http

//rutas base
app.use('/api',mesonero_routes);
app.use('/api',mesa_routes);

app.use('/api',pedido_routes);

module.exports = app;
