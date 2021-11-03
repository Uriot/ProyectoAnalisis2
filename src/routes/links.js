const express = require("express");
const router = express.Router();

/*importar conexion*/
/* pool o db */
const pool = require("../database");


/*  cuando pida  conexion a la ruta add*/
router.get("/add", (req, res) =>{
    res.render("links/add");
});



router.post("/add", (req, res) =>{
    res.send("revisado");
});

/*  cuando pida  conexion a la ruta add*/
router.get("/reserva", (req, res) =>{
    res.send("reserva");
});

router.get("/inicio", (req, res) =>{
    res.send("Inicio");
});

module.exports = router;

