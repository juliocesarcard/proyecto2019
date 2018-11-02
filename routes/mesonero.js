'use strict'

var express = require('express');
var MesoneroController = require('../controllers/mesonero');

var api = express.Router();
var md_auth = require('../middlewares/autenticate');

api.get('/probando_controladormesonero', md_auth.ensureAuth, MesoneroController.prueba);
api.post('/registro', MesoneroController.guardarMesonero);
api.post('/login', MesoneroController.loginMesonero);
api.put('/update/:id', md_auth.ensureAuth,MesoneroController.updateMesonero);

module.exports = api; 