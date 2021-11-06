const express = require('express');
const morgan = require("morgan");
//motor de plantillas
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require("connect-flash");
const  session = require("express-session");
const { Store } = require('express-session');
const MySQLStore = require("express-mysql-session");
const passport = require("passport");
//const { extname } = require("path");

const {database} = require("./keys");

//inicializar
//app es la aplicacion a usar
const app = express();
require("./lib/passport");

//configuraciones
//definir puerto
//si exsiste algun puerto disponeble usarlo sino se usa el 4000
app.set('port', process.env.PORT || 4000);             

//* enviar a node donde esta la carpera de vistas
//* con dirname devuelve direccion del archivo en ejecucion
app.set('views', path.join(__dirname, 'views'));

//* exporta lo que hay el views en carpeta laytoyus de nombre main;
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    //*unir directorios
    layoutsDir: path.join(app.get('views'), 'layouts'),
    //*donde van trosos de codigo
    partialsDir: path.join(app.get('views'), 'partials'),
    //*nombre de archivos de handerbals
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');


//Midelwares
//Funcion por peticion
//ejecucion de morgan
//mostrar tipo por consola
app.use(session({
    secret: "elliot",
    resave: false,
    saveUninitialized: false,
    Store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


//Variables Globales
//* informacion, respuesta, funcion de contiyuar en codigo
app.use((req, res, next) => {
    app.locals.exito = req.flash("exito");
    app.locals.message = req.flash("message");

    next();
})


//Rutas (servidor)
//definir ruta o crear ruta que esta en routes
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use("/links", require('./routes/links'));
app.use("/links/images", require("./routes/links"));


//Archivos Publicos
//codigo que el navegador puede acceder
app.use(express.static(path.join(__dirname, "public")));

//Iniciar Servidor
app.listen(app.get("port"), () =>{
    console.log("Server en Puerto : ", app.get("port"))
});
// inicia con npm run dev solo en ruta inicial