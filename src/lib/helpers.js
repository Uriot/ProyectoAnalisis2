const bcrypt = require("bcryptjs");

const helpers={};


//* cifrar contraseña
helpers.encryptPassword = async (PASSWORD) =>{
    //* crear hash y cuantas veces se ejecuta
    const salt = await bcrypt.genSalt(10);
    //*hash la contraseña y la hash creada arriba
    const hash = await bcrypt.hash(PASSWORD, salt);
    return hash;
};

helpers.matchPassword = async (PASSWORD, savedPassword)=>{
    try {
        return await bcrypt.compare(PASSWORD, savedPassword);
    } catch (e) {
        console.log(e);
    }
};


module.exports = helpers;