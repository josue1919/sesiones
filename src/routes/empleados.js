const express=require('express');
const router=express.Router();
const{isAuthenticated}=require('../helpers/auth');
const passport=require('passport');

router.get('/empleados/login',(req,res)=>{
    res.render('empleados/login')
});

router.get('/empleados/inicio',isAuthenticated, (req, res) => {

    res.render('empleados/inicio')
});

router.get('/empleados/eventos',isAuthenticated, (req, res) => {
    res.render('empleados/eventos');

});
router.get('/empleados/mapa',isAuthenticated, (req, res) => {
    res.render('empleados/mapa');


});
router.get('/empleados/galeria',isAuthenticated, (req, res) => {
    res.render('empleados/galeria');


});

router.get('/empleados/ilustraciones',isAuthenticated, (req, res) => {
    res.render('empleados/ilustraciones');


});


//para el login
router.post('/empleados/signin', passport.authenticate('local',{
    
    successRedirect:'/empleados/inicio',
    failureRedirect:'/empleados/login',
    failureFlash:true

}));
//para el logout
router.get('/empleados/logout', (req, res) => {

    req.logOut();
     res.redirect('/empleados/login');

});
module.exports=router;
