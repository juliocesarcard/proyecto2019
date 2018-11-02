    'uses strict'
var mongoose = require("mongoose");
var app = require("./app");
var port = process.env.PORT ||3997;
mongoose.connect('mongodb://localhost:27017/apirest',(err,res) =>{
    if (err){
        throw err;
    }else{
        console.log("la base de datos esta funcionando");

        app.listen(port, function(){
           console.log("Servidor de ApiRest funcionando en el puerto "+ port);
        });
    }
});