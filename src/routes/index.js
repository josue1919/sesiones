const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    res.render('index')
});
// router.get('/empleados/login',(req,res)=>{
//     res.render('empleados/login')
// });

module.exports=router;
