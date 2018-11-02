'user strict'


var bcrypt = require('bcrypt-nodejs');// cargar contraseña directamente encriptada
var Mesonero = require('../models/mesonero');
var jwt = require('../services/jwt');


function prueba(req, res){
    res.status(200).send({
        message:'probando las acciones del controlador Mesoneros'
    });
}

function guardarMesonero (req, res){
    var mesonero = new Mesonero();

    var params = req.body;// recoge todas las variables que viene desde post

    console.log(params);
    
    mesonero.nombre = params.nombre;
    mesonero.apellido = params.apellido;
    mesonero.cedula = params.cedula;
    mesonero.email = params.email;
    mesonero.password = params.password;
    
    if (params.password){
        //encriptar contraseña que viene desde bcrypt y guardar datos
        bcrypt.hash(params.password,null,null,function(err,hash){
            mesonero.password = hash;
            if(mesonero.nombre!=null && mesonero.apellido != null && mesonero.cedula !=null && mesonero.email !=null){
                    //guarda en la base de datos
                mesonero.save((err,MesoneroStored) => {
                    if(err){
                        res.status(500).send({message:'Error al Guardar'});
                    }else{
                        if(!MesoneroStored){
                            res.status(404).send({message:'NO SE REGISTRO EL USUARIO'});
                        }else{
                            res.status(200).send({mesonero: MesoneroStored});
                        }
                    }
            
                });
            }else{
                res.status(200).send({message:'Introduce todos los campos'});
            }
        });
    }else{
        res.status(200).send({message:'Introduce una contraseña'});
    }
}
function loginMesonero(req,res){//comprueba si email y password existen en la BD
    var params = req.body;

    var email = params.email;
    var password = params.password;
    
    Mesonero.findOne({email: email.toLowerCase()}, (err,mesonero) => {
        if(err){
            res.status(500).send({message:'error en la peticion'});
        }else{
            if(!mesonero){
                res.status(404).send({message:'error: el usuario no existe'})
            }else{
                //comprobar contraseña
                bcrypt.compare(password, mesonero.password, function(err, check){
                    if(check){
                        //devolver los datos del usuario logueado
                        if(params.gethash){            
                            //devolver token de jwt
                            res.status(200).send({
                               token:jwt.createToken(mesonero)
                          });
                        }else{
                            //devolver datos de usuario 
                         res.status(200).send({mesonero});
                        }
                    }else{
                        res.status(404).send({message:'error: el usuario no se ha podido loguear'});
                    }
                });
            }
        }
    });
}

function updateMesonero(req,res){
    var mesoneroId = req.params.id;
    var update = req.body

    Mesonero.findByIdAndUpdate(mesoneroId, update,(err, mesoneroUpdated) =>{

        if(err){
            res.status(500).send({message:'error al actualizar'});
        }else{
            if(!mesoneroUpdated){
                res.status(400).send({message:'no se ha podido actualizar '});
            }else{
                res.status(200).send({mesonero: mesoneroUpdated});
            }
        }
    });
}

module.exports = {
    prueba,
    guardarMesonero,
    loginMesonero,
    updateMesonero
};