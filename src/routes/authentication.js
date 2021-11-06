const express = require("express");
const router = express.Router();

const passport = require("passport");

//*crear rutas de usuario
router.get("/singup", (req, res) =>{
    res.render("auth/singup");
});

// router.post("/singup",(req, res) =>{
//     passport.authenticate("local.singup",{
//         successRedirect: "/profile",
//         failureRedirect: "/singup",
//         failureFlash: true
//     });
//     //console.log(req.body);
//     res.send("Recibido");
// });

router.post("/singup", passport.authenticate("local.singup",{
    successRedirect: "/inicio",
    failureRedirect: "/singup",
    failureFlash: true
})); 

/* inicio */
router.get('/signin', (req, res) => {
    res.render('auth/signin');
});

router.post("/signin", (req, res, next)=>{
    passport.authenticate('local.signin', {
        successRedirect: '/inicio',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get("/profile", (req, res)=>{
    res.send("Perfil")
});

module.exports = router;