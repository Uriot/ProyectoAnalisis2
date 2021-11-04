const express = require("express");
const router = express.Router();
//const direfente = require("http://momentjs.com/downloads/moment.min.js");

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
    const{nombre, telefono, dpi, mail, id_tipo_habitacion, fechaEntrada, fechaSalida} = req.body;


    let date_1 = new Date(fechaEntrada);
    let date_2 = new Date(fechaSalida);

    let day_as_milliseconds = 86400000;
    let diff_in_millisenconds = date_2 - date_1;
    let estancia = diff_in_millisenconds / day_as_milliseconds;

    console.log(estancia);
    let subtotal = 0;
    if(id_tipo_habitacion == 1){
        subtotal = 300 * estancia;
    }else if( id_tipo_habitacion ==2){
        subtotal = 500 * estancia;
    } else if(id_tipo_habitacion == 3){
        subtotal = 800 * estancia;
    } else if(id_tipo_habitacion == 4){
        subtotal = 1400 * estancia;
    }
    console.log(id_tipo_habitacion);
    console.log(subtotal);

    //let id_user = null;

    //*objeto dentro porque se puede enlazar al usuario
    const nuevaReserva ={
        nombre,
        telefono,
        dpi,
        mail,
        id_tipo_habitacion,
        fechaEntrada,
        fechaSalida,
        estancia,
        subtotal
        //id_user
    };

    //*result de promesa
    await pool.query("INSERT INTO reservacion set ?", [nuevaReserva]);

    console.log(nuevaReserva);
    res.send("revisado");
});

/*  cuando pida  conexion a la ruta add*/
router.get("/servicios", (req, res) =>{
    res.render("links/servicios");
});

router.get("/inicio", (req, res) =>{
    res.render("links/inicio");
});

router.get("/experiencia", (req, res) =>{
    res.render("links/experiencia");
});


module.exports = router;

