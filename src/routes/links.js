const express = require("express");
const router = express.Router();

/*importar conexion*/
/* pool o db */
const pool = require("../database");


/*  cuando pida  conexion a la ruta add*/
router.get("/add", (req, res) =>{
    res.render("links/add");
});


//*promesa
router.post("/add", async (req, res) =>{
    console.log(req.body);
    //*Destricturing
    const{nombre_reserva, telefono, dpi, mail, id_tipo_habitacion, fechaEntrada, fechaSalida} = req.body;
    let estancia = fechaSalida-fechaEntrada;
    //*objeto dentro porque se puede enlazar al usuario
    const nuevaReserva ={
        nombre_reserva,
        telefono,
        dpi,
        mail,
        id_tipo_habitacion,
        fechaEntrada,
        fechaSalida,
        estancia,
        subtotal,
        id_user
    };

    //*result de promesa
    await pool.query("INSERT INTO reservacion set ?", [nuevaReserva]);

    console.log(nuevaReserva);
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

