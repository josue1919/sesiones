const express=require('express');
const router=express.Router();
const usersController=require('../controllers/usersController')
const multer=require('multer');
var fecha=Date.now();
const path = require('path');
const{isAuthenticated}=require('../helpers/auth');
const passport=require('passport');

var rutaAlmacen=multer.diskStorage(

    {
        
        destination: path.join(__dirname, '../public/uploads/images/'),

        filename:function(request,file,callback){

            console.log(file);
            callback(null,fecha+"_"+file.originalname)
        }


    }

);

var cargar=multer({storage:rutaAlmacen});
//para logearse
router.post('/users/signin', passport.authenticate('local',{

    successRedirect:'/users/all',
    failureRedirect:'/',
    failureFlash:true

}));

//para ver la tablade los empleados
router.get('/users/all',isAuthenticated,usersController.index);

//para crear empleados redirije
router.get('/users/add',isAuthenticated, (req, res) => {

    res.render('users/add-user');
});

//para crear empleados
router.post('/users/add',isAuthenticated,cargar.single("imagen"),usersController.guardar );

//para obtener la ruta de la edicion
router.get('/users/edit/:id',isAuthenticated,usersController.getEdit);
router.put('/users/edit/:id',isAuthenticated,cargar.single("imagen"),usersController.Update);
router.delete('/users/delete/:id',isAuthenticated,usersController.Delete);

//para salir de la aplicacion
router.get('/users/logout', (req, res) => {

    req.logOut();
     res.redirect('/');

});
module.exports=router;