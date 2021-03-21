const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/Users');


passport.use(new LocalStrategy({

    usernameField:'email',

},async(email,password,done)=>{

    //va a buscar en la base de datos a un usuario por su email
    const user=await User.findOne({email:email});
    //si el usuario no existe nos dara un mensaje de error
    // if(!user.admin){
    //     return done(null,false,{message:'No es admin'});
    // }
    if(!user){
        return done(null,false,{message:'usuario no econtrado'});
        
    }else{
        //en base al usuario encontado se compara si coincide con su contraseña
        const match=await user.matchPassword(password);
        //si coincide la contraseña con el usuario que se busco
        if(match){
            //devuelve un callback con el usuario encontradp
            return done(null,user);
        }else{
            //en caso de que no coincida la contraseña con el usuario nos devuelve un error
            return done(null,false,{message:'contraseña incorrecta'});
        }
    }


}));

passport.serializeUser((user,done)=>{
    done(null,user.id);

});

passport.deserializeUser((id,done)=>{

    User.findById(id,(err,user)=>{

        done(err,user);
    });
});