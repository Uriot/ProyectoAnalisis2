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
    //*Destructuring
    const{nombre, telefono, dpi, mail, id_tipo_habitacion, fechaEntrada, fechaSalida} = req.body;


    let date_1 = new Date(fechaEntrada);
    let date_2 = new Date(fechaSalida);

    let day_as_milliseconds = 86400000;
    let diff_in_millisenconds = date_2 - date_1;
    let estancia = diff_in_millisenconds / day_as_milliseconds;

    //console.log(estancia);
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
    //console.log(id_tipo_habitacion);
    //console.log(subtotal);

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
    req.flash("exito", "Usted ha reservado exitosamente");

    res.redirect("/links/reservas");
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

router.get("/contacto", (req, res) =>{
    res.render("links/contacto");
});

//*ingresar comentario
router.post("/contacto", async (req, res) =>{
    //console.log(req.body)
    //* Destructurig
    const{nombre_comentario, telefono_comentario, mail_comentario, mensaje_comentario} = req.body;

    const nuevoComentario ={
        nombre_comentario,
        //casa nombre
        telefono_comentario,
        mail_comentario,
        mensaje_comentario
        //!id_usuario
    }
    await pool.query("INSERT INTO comentario set ?", [nuevoComentario]);
    console.log(nuevoComentario);
    req.flash("exito", "El comentario ha sido enviado exitosamente pronto alguien se comunicara con usted");
    res.redirect("/links/inicio");
});

//* Mostar reservas
router.get("/reservas", async (req, res) =>{
    const reservas = await pool.query("select r.*, t.nombre_habitacion from reservacion r inner join tipo_habitacion t on r.id_tipo_habitacion = t.id_tipo_habitacion;");
    //console.log(reservas);
    //*enviar datos al servidor por listas para que imprima
    res.render("links/reservas", {reservas: reservas});
});

//*borrar reserva
router.get("/delete/:id_reserva", async (req, res) =>{
    //*cuando manda el id es para ver el parametro
    //console.log(req.params.id_reserva);
    const{id_reserva} = req.params;
    //res.send("Eliminado");
    await pool.query("delete from reservacion where id_reserva = ?", [id_reserva]);
    req.flash("exito", "Se ha eliminado exitosamente la reserva");
    res.redirect("/links/reservas");
})

//*campos a editar en reserva
router.get("/edit/:id_reserva", async(req, res) =>{
    const{id_reserva} = req.params;
    console.log(id_reserva);
    const reserva = await pool.query("select * from reservacion where id_reserva = ?", [id_reserva]);

    res.render("links/edit", {reserva: reserva[0]});
   // console.log(reserva[0]);
})

//*update a reserva
router.post("/edit/:id_reserva", async(req, res) =>{
    const{id_reserva} = req.params;
    const{nombre, telefono, dpi, mail, id_tipo_habitacion, fechaEntrada, fechaSalida} = req.body;

    let date_1 = new Date(fechaEntrada);
    let date_2 = new Date(fechaSalida);

    let day_as_milliseconds = 86400000;
    let diff_in_millisenconds = date_2 - date_1;
    let estancia = diff_in_millisenconds / day_as_milliseconds;

    //console.log(estancia);
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
    //console.log(id_tipo_habitacion);
    //console.log(subtotal);

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
    console.log(nuevaReserva);
    //res.send("actualizado");
    await pool.query("update reservacion set ? where id_reserva = ?", [nuevaReserva, id_reserva]);

    req.flash("exito", "Reserva editada exitosamente");
    res.redirect("/links/reservas");
})

module.exports = router;

