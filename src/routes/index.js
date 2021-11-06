//almacenar las rutas principales

const express = require("express");
//metodo para que al ejecutarse se vuelva un objeto
const router = express.Router();

//definir una ruta
router.get("/", (req, res) =>{
    res.render("links/inicio");
})


module.exports = router;