const express=require('express');
const router=express.Router();
const{isAuthenticated}=require('../helpers/auth');
const passport=require('passport');

//para el login
router.post('/empleados/signin', passport.authenticate('local',{

    successRedirect:'/empleados/inicio',
    failureRedirect:'/empleados/login',
    failureFlash:true

}));




router.get('/empleados/login',(req,res)=>{




       res.render('empleados/login')





});

router.get('/empleados/inicio',isAuthenticated, (req, res) => {

   
                if(!req.user.inival){
                  res.render('empleados/denegado');
                  
                }else{
                    
                 res.render('empleados/inicio')
                }
     

 
});

router.get('/empleados/eventos',isAuthenticated, (req, res) => {
    
    if(!req.user.eventosval){
      res.render('empleados/denegado');

    }else{
        
     res.render('empleados/eventos')
    }


});
router.get('/empleados/mapa',isAuthenticated, (req, res) => {

    if(!req.user.mapaval){
      res.render('empleados/denegado');

    }else{
        
        res.render('empleados/mapa');  
     
    }


        
        


});
router.get('/empleados/galeria',isAuthenticated, (req, res) => {
    if(!req.user.galeriaval){
      res.render('empleados/denegado');

    }else{
        
        res.render('empleados/galeria');
     
    }
    
   


});

router.get('/empleados/ilustraciones',isAuthenticated, (req, res) => {
  console.log(req.user.ilustracionesval)
    // res.render('empleados/ilustraciones');
        if(!req.user.ilustracionesval){
          res.render('empleados/denegado');

        }else{
            res.render('empleados/ilustraciones');
        }

       
        
   
});



//para el logout
router.get('/empleados/logout', (req, res) => {

    req.logOut();
     res.redirect('/empleados/login');

});
module.exports=router;
