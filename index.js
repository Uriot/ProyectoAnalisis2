const express = require("express");
const morgan = require("morgan");

//inicializar
//app es la aplicacion a usar
const app = express();

//configuraciones
//definir puerto
//si exsiste algun puerto disponeble usarlo sino se usa el 4000
app.set("port", process.env.PORT || 4000);


//Midelwares
//Funcion por peticion
//ejecucion de morgan
//mostrar tipo por consola
app.use(morgan("dev"));

//Variables Globales


//Rutas (servidor)

//Archivos Publicos

//Iniciar Servidor
app.listen(app.get("port"));
