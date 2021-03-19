const express=require('express');
const router=express.Router();
const usersController=require('../controllers/usersController')
const multer=require('multer');
var fecha=Date.now();
const path = require('path');

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


//para ver la tablade los empleados
router.get('/users/all',usersController.index);

//para crear empleados redirije
router.get('/users/add', (req, res) => {

    res.render('users/add-user');
});

//para crear empleados
router.post('/users/add',cargar.single("imagen"),usersController.guardar );

//para obtener la ruta de la edicion
router.get('/users/edit/:id',usersController.getEdit);
router.put('/users/edit/:id',usersController.Update);
router.delete('/users/delete/:id',usersController.Delete);


module.exports=router;