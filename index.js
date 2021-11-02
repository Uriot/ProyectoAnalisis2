const express = require("express");

//inicializar
//app es la aplicacion a usar
const app = express();

//configuraciones
//definir puerto
//si exsiste algun puerto disponeble usarlo sino se usa el 4000
app.set("port", process.env.PORT || 4000);