const User = require("../models/Users");
const { unlink } = require('fs-extra');

// const Users = require("../models/Users");
const ruta = require('path');

//autenticacion


module.exports = {


  
  //para traer todos los usuarios
  index: async function (req, res) {

    if(!req.user.admin){
      req.flash("error_msg", "No es admin");
      req.logOut();
     res.redirect('/');
    }else{{
       // console.log(req.user)
    await User.find({user:req.user.id})
    .sort({ date: "desc" })
    .then((documentos) => {
      const contexto = {
        users: documentos.map((documento) => {
          return {
            name: documento.name,
            email: documento.email,
            filename:documento.filename,
            _id: documento._id,
            
          };
        }),
      };
      res.render("users/all-user", {
        users: contexto.users,
      });
    });
    }}
   
  },
  //para guardar usuarios

  guardar: async function (req, res) {
    //variable para guardar las paginas
    
    var inicio=req.body.inicio;
    var galeria=req.body.galeria;
    var mapa=req.body.mapa;
    var ilustraciones=req.body.ilustraciones;
    var eventos=req.body.eventos;
    //constante para valores booleanos
   


    
    if(!req.body.inicio){
       var inival=false;
    }else{
      inival=true
    }

    if(!req.body.galeria){
      var galeriaval=false;
    }else{
      galeriaval=true;
    }

    if(!req.body.mapa){
      var mapaval=false;
    }else{
      mapaval=true;
    }

    if(!req.body.ilustraciones){
     var ilustracionesval=false;
    }else{
      ilustracionesval=true;
    }

    if(!req.body.eventos){
      var eventosval=false;
    }else{
      eventosval=true;
    }
    //guardamos todos en un arreglo de objetos
    const pages=[{namepage:inicio},{namepage:galeria},{namepage:mapa},{namepage:ilustraciones},{namepage:eventos}];
    var errors = [];

   //validamos que la imagen no puede estar vacia
   //creamos variable para el req.file.name asi poder validar la imagen mas facil
  //  const imagen=req.file.filename
   if(req.file){
    if(req.file.filename){
      if(req.body){
        var path='/uploads/images/'+req.file.filename;
      var filename=req.file.filename;

      }
    }
   }
   if(!req.file){
    errors.push({ text: "La imagen no puede estar vacia" });

    

   }

   
    const { name, email, password, confirm_password } = req.body;
  //  validaciones de campos vacios
    if (!name || !email || !password || !confirm_password) {
      errors.push({ text: "Algun campo esta vacio" });
     
    }
    if (password != confirm_password) {
      errors.push({ text: "contrase??as no coinciden" });
    }
    if (password.length < 4) {
      errors.push({ text: "contrase??a debe ser mayor a 4 caracteres." });
    }
    if (errors.length > 0) {
      res.render("users/add-user", {
        errors,
        name,
        email,
        password,
        confirm_password,
       
        
      });
      
    } else {
      // buscar email iguales
    
      const emailUser = await User.findOne({ email: email });
      if (emailUser) {
        req.flash("error_msg", "EL correo electronico ya esta en uso");

        res.redirect("/users/add");
      } else {
        
          console.log("valor de inival "+ inival)
          // Saving a New User
       const newUser = new User({ name, email, password,filename,path,pages,inival,galeriaval,mapaval,ilustracionesval,eventosval});
       // newUser.password = await newUser.encryptPassword(password);
       newUser.user=req.user.id;
       await newUser.save();
       req.flash("success_msg", "Usuario registrado");
       res.redirect("/users/all");

        
       
       

        
       
      }
    }
  },

  //para obter la ruta de la edicion
  getEdit: async function (req, res) {
    console.log(req.params.id);
    const users = await User.findById(req.params.id)
      .lean()

      .then((documento) => {
        return {
          name: documento.name,
          email: documento.email,
          filename:documento.filename,
          password:documento.password,
          _id: documento._id,
          //para traer los checkbox
          inival:documento.inival,
          galeriaval:documento.galeriaval,
          mapaval:documento.mapaval,
          ilustracionesval:documento.ilustracionesval,
          eventosval:documento.eventosval
        };
      });
    res.render("users/edit-user", { users });
  },

  //metodo put para hacer update en la bd
  Update: async function (req, res) {
    //variable para guardar las paginas
    var inicio=req.body.inicio;
    var galeria=req.body.galeria;
    var mapa=req.body.mapa;
    var ilustraciones=req.body.ilustraciones;
    var eventos=req.body.eventos;

      //variables para los valores true o false
      if(!req.body.inicio){
        var inival=false;
     }else{
       inival=true
     }
 
     if(!req.body.galeria){
       var galeriaval=false;
     }else{
       galeriaval=true;
     }
 
     if(!req.body.mapa){
       var mapaval=false;
     }else{
       mapaval=true;
     }
 
     if(!req.body.ilustraciones){
      var ilustracionesval=false;
     }else{
       ilustracionesval=true;
     }
 
     if(!req.body.eventos){
       var eventosval=false;
     }else{
       eventosval=true;
     }





    //guardamos todos en un arreglo de objetos
    const pages=[{namepage:inicio},{namepage:galeria},{namepage:mapa},{namepage:ilustraciones},{namepage:eventos}];
    //para la imagen eliminar si se actualiza eliminar la de  src
    if(req.file){

      if(req.file.filename){
        console.log(req.params.id);
        const imagenDelete=await User.findById(req.params.id);
        await unlink(ruta.resolve( __dirname,'../public/uploads/images/')+"/"+imagenDelete.filename)



        var filename=req.file.filename;
      const path='/uploads/images/'+req.file.filename;
            
            
      const { name, email, password } = req.body;
      

      await User.findByIdAndUpdate(req.params.id, {  name, email, password ,filename,path,pages,inival,galeriaval,mapaval,ilustracionesval,eventosval});
      }


    }

    //si no se cambia la imagen no se eliminara
    
    if(req.body.name){
      // var filename=req.file.filename;
      // const path='/uploads/images/'+req.file.filename;
  
      const { name, email, password } = req.body;
      await User.findByIdAndUpdate(req.params.id, { name, email, password ,pages,inival,galeriaval,mapaval,ilustracionesval,eventosval  });
    }
    req.flash("success_msg", "El usuario a sido actualizado");

    res.redirect("/users/all");

  },


  

  //eliminar un usuario

  Delete: async function (req, res) {
    //borrar la imagen de la ruta
    

      // const { id } = req.params;

    console.log(req.params.id);
    const imagenDelete=await User.findByIdAndDelete(req.params.id);
    await unlink(ruta.resolve( __dirname,'../public')+imagenDelete.path)

    req.flash("success_msg", "Usuario eliminado satisfactoriamente");
    res.redirect("/users/all");
  },
};
