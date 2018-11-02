'user strict'

var Mesa = require('../models/mesa');
var Mesa = require('../models/mesa');

function prueba(req, res) {
    res.status(200).send({
        message: 'probando las acciones del controlador Mesa'
    });
}

function getMesas() {
    return new Promise((resolve, reject)=> {
        const response = {
            code: 500,
            message: ""
        };

        Mesa.find((err, mesa) => {
            if (err) {
                reject({
                    code: 500,
                    err
                });
            } else {
                if (!mesa) {
                    reject({
                        code: 404,
                        err: "mesa no existe"
                    })
                } else {
                    resolve({code: 200, mesa})
                }
            }
        });
    })
}


function getMesa(id) {
    return new Promise((resolve, reject) => {
        Mesa.findById(id, (err, mesa) => {
            if (err) {
                reject({code:500, err})
                //res.status(500).send({message:'error en la peticion'});
            } else {
                if (!mesa) {
                    reject({code:404, err: 'mesa no existe' });
                } else {
                    resolve({code:200, mesa })
                }
            }
        });
    })
}

function updateMesa(id, update, callback = () => { }) {
    Mesa.findByIdAndUpdate(id, update, (err, mesaUpdated) => {
        if (err) {
            callback(500, { message: 'error al actualizar mesa' })
            // res.status(500).send({message:'error al actualizar mesa'});
        } else {
            if (!mesaUpdated) {
                callback(400, { message: 'mesa no ha sido actualizado' });
            } else {

                //Mesa.find({Mesa: mesaUpdated._id}),update((err, mesaUpdate))
                callback(200, { mesa: update });

            }
        }

    });
}

function guardarMesa(req, res) {
    var mesa = new Mesa();
    mesa.status = false;

    mesa.save((err, mesa) => {
        if (err) {
            res.status(500).send({ message: 'Error al Guardar' });
        } else {
            if (!mesa) {
                res.status(404).send({ message: 'Error al guardar mesa' });
            } else {
                res.status(200).send({ mesa });
            }
        }

    });
}

module.exports = {
    prueba,
    getMesa,
    getMesas,
    updateMesa,
    guardarMesa
}