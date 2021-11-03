const mysql = require("mysql");

//* para  pasar arrow a promesas
const{promisify} = require("util");


//* Se manda a traer datos de bd a keys
const{database} = require("./keys");

//*Puede ser create conection o create pool */
//* pool sirve para ir ejecutando tareas a la vez por hilos

const pool = mysql.createPool(database);

//* obtenemos error o la conexion
pool.getConnection((err, connection) =>{
    if(err){
        if(err.code === "PROTOCOL_CONNECTION_LOST"){
            console.error("La conexion a base de datos esta cerrada");
            throw err;
        }
        if(err.code === "ER_CON_COUNT_ERROR"){
            console.error("La Base de datos tiene varias conexiones");
            throw err;
        }
        if(err.code === "ECONNREFUSED"){
            console.error("La Conexion fue Rechazada verifica datos de BD");
            throw err;
        }
    }
    if(connection){
        //*Inicia Conexion
        connection.release();
        console.log("Base de Datos conectada");
    }
    return;
});

//* cuando sea un query se puede usar promesas
pool.query = promisify(pool.query);

module.exports = pool;