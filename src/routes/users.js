const express=require('express');
const router=express.Router();
const usersController=require('../controllers/usersController')




//para ver la tablade los empleados
router.get('/users/all',usersController.index);

//para crear empleados redirije
router.get('/users/add', (req, res) => {

    res.render('users/add-user');
});

//para crear empleados
router.post('/users/add',usersController.guardar );

//para obtener la ruta de la edicion
router.get('/users/edit/:id',usersController.getEdit);
router.put('/users/edit/:id',usersController.Update);
router.delete('/users/delete/:id',usersController.Delete);


module.exports=router;