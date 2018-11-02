'user strict'

var Pedido = require('../models/pedido');
var MesaController = require("./mesa");


async function getPedido(id){
    return new Promise((resolve, reject) => {
        Pedido.findById(id, (err, pedido) => {
            if(err){
                reject({code:500, err });
            }else{
                if(!pedido){
                    reject({code:404, err });
                }else{
                    resolve({code:200, pedido });
                }
            }
        });
    })
}

async function guardarPedido(req, res){
    var pedido = new Pedido();

    var params = req.body;

    pedido.id = params.id;
    pedido.idMesa = params.idMesa;
    pedido.idMesonero = params.idMesonero;
    pedido.descripcion = params.descripcion;

    pedido.save(async (err,pedidoStored) =>{
        if(err){
            res.status(500).send({message: 'error al guardar pedido'});
        }else{
            if(!pedidoStored){
                res.status(404).send({message: 'pedido no guardado'});
            }else{
                const { mesa } = await MesaController.getMesa(pedido.idMesa);
                mesa.status = true;
                MesaController.updateMesa(pedido.idMesa, mesa, (code)=> {
                    res.status(code).send({pedido: pedidoStored});
                });
            }
        }
    });
}

function updatePedido( req, res){
    var pedido = new Pedido;
    var pedidoId = req.params.id;
    var update = req.body;
    var params = req.body;

    pedido.id = params.id;
    pedido.idMesa = params.idMesa;
    pedido.idMesonero = params.idMesonero;
    pedido.descripcion = params.descripcion;

    
    Pedido.findByIdAndUpdate(pedidoId, update, (err, pedidoUpdated) =>{
        if(err){
            res.status(500).send({message:'error al guardar el pedido'});
        }else{
            if(!pedidoUpdated){
                res.status(404).send({message:'el pedido no ha sido actualizado'});
            }else{

                res.status(200).send({pedido: pedidoUpdated});

            }
        }

    });
}

function getPedidos( req, res){
    if(req.params.page){
        var page = req.params.page;
    }else{
        page = 1;
    }
    var itemsPerPage = 3;   
    
    Pedido.find().sort('id').paginate(oage, itemsPerPage, function(err, pedidos, total){
        if(err){
            res.status(500).send({message:'Error en la peticion'});
        }else{
            if(!pedidos){
                res.status(404).send({message:'pedido'});
            }else{
                return res.status(200).send({
                    
                    pages: total,
                    pedidos:pedidos                
                });
            }
        }
    });
}



async function deletePedido(req, res){
    try {
        var pedidoId = req.params.id;
    const pedido = await getPedido(pedidoId);
    Pedido.findByIdAndRemove(pedidoId, async (err, pedidoRemoved) => {
        try {
            if (err){
                res.status(500).send({message:'error al guardar el pedido'});
            }else{
                if(!pedidoRemoved){
                    res.status(404).send({message:'el pedido no ha sido eliminado'});
                }else{
                    const { mesa } = await MesaController.getMesa(pedidoRemoved.idMesa);
                    mesa.status = false;
                    MesaController.updateMesa(pedidoRemoved.idMesa, mesa, (code)=> {
                        res.status(code).send({pedido: pedidoRemoved});
                    }); 
                }
            }
        } catch (error) {
            res.status(500).send(error.err || error.message || error);
    
        }

    });
    } catch (error) {
        res.status(500).send(error.err || error.message || error);

    }

}

function prueba(req, res){
    res.status(200).send({
        message:'probando las acciones del controlador Pedido'
    });
}

module.exports = {
    prueba,
    guardarPedido,
    getPedido,
    updatePedido,
    deletePedido,
    getPedidos
};