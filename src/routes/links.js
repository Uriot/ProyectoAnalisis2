const express = require("express");
const router = express.Router();

/*importar conexion*/
/* pool o db */
const pool = require("../database");


/*  cuando pida  conexion a la ruta add*/
router.get("/add", (req, res) =>{
    res.render("links/add");
});

module.exports = router;

