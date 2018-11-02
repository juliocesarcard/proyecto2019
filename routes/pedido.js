'use strict'

var express = require('express');
var PedidoController = require('../controllers/pedido');
var api = express.Router();
var md_auth = require('../middlewares/autenticate');

api.get('/pedido/:id' , async (req, res) => {
    try {
        const response = await PedidoController.getPedido(req.params.id);
        res.status(response.code).send(response.err || response.pedido);   
    } catch (error){
        res.status(500).send(error.err || error.message || error);
    }
});
api.post('/pedido', PedidoController.guardarPedido);
api.put('/pedido/:id',PedidoController.updatePedido);
api.delete('/pedido/:id',PedidoController.deletePedido);
api.get('/pedido/:page', PedidoController.getPedidos);

module.exports = api;