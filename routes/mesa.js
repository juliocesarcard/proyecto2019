'use strict'

var express = require('express');
var MesaController = require('../controllers/mesa');

var api = express.Router();

api.get('/mesa', async (req, res) => {
    const response = await MesaController.getMesas();
    res.status(response.code).send(response.err || response.mesa);
});

api.get('/mesa/:id', async (req, res) => {
    const response = await MesaController.getMesa(req.params.id);
    res.status(response.code).send(response.err || response.mesa);
});
api.put('/mesa/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { mesa } = await MesaController.getMesa(id);
        mesa.status = req.body.status;
        console.log(mesa);
        MesaController.updateMesa(id, mesa, (code, message )=> {
            res.status(code).send(message);
        })
    } catch (error) {
        console.error(error)
        res.status(error.code).send(error.err);
        
    }
    
});
api.post('/mesa', MesaController.guardarMesa);
module.exports = api;