//* metodos de autentificacion
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;


const pool = require("../database");
const helpers = require("../lib/helpers")

//*login
passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'PASSWORD',
    passReqToCallback: true
}, async (req, username, PASSWORD, done) => {
    console.log(req.body);
    //console.log(username);
    //console.log(PASSWORD);
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(PASSWORD, user.PASSWORD)
        if (validPassword) {
            done(null, user, req.flash("exito" , 'Bienvenido ' + user.username));
        } else {
            done(null, false, req.flash("message", 'Contraseña incorrecta'));
        }
    } else {
        return done(null, false, req.flash("message", 'el usuario no existe'));
    }
}));


//*crear usuario
passport.use("local.singup", new LocalStrategy({
    usernameField: "username",
    passwordField: "PASSWORD",
    passReqToCallback: true
}, async (req, username, PASSWORD, done) => {

    const { email, nombre_completo_user, dpi_user, nit_user, telefono_user, id_tipo_user } = req.body;

    // console.log(req.body);
    const nuevoUsuario = {
        username,
        PASSWORD,
        email,
        nombre_completo_user,
        dpi_user,
        nit_user,
        telefono_user,
        id_tipo_user
    };
    console.log(nuevoUsuario);
    nuevoUsuario.PASSWORD = await helpers.encryptPassword(PASSWORD);
    const result = await pool.query("insert into users set ?", [nuevoUsuario]);
    //console.log(result);
    nuevoUsuario.id_user = result.insertId;
    return done(null, nuevoUsuario);
}));

//*serializar usuario
passport.serializeUser((user, done) => {
    done(null, user.id_user);

});

passport.deserializeUser(async (id_user, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE id_user = ?', [id_user]);
    done(null, rows[0]);
  });



//*desserializar usuario