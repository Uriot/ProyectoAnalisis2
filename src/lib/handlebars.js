//* configurar las fechas con time ago
//*importar metodo format de timeago
const {format} = require('timeago.js');

//*objeto de usar desde vistas
const helpers = {};
//*metodo para tomar el tiempo de la vista

helpers.timeago = (savedTimestamp) => {
    //*convertir a minutos atras
    return format(savedTimestamp);
};

module.exports = helpers;