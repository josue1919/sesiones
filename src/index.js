const express=require('express');
const path=require('path');
const exhbs=require('express-handlebars');
const methodOverride=require('method-override');
const session=require('express-session');
const flash=require('connect-flash');
const uuid = require('uuid/v4');

const passport=require('passport');


const multer = require('multer');
//inicializaiones
const app=express();
require('./database');
require('./config/passport');
//setings
app.set('port',process.env.PORT || 3000);
app.set('views',path.join(__dirname, 'views'));
app.engine('.hbs',exhbs({
    defaultLayout:'main' ,
    layoutsDir:path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname:'.hbs'
   
}));


app.set('view engine', '.hbs');
//midelwares


// app.use(multer({rutaAlmacen}).single("imagen"))
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));

app.use(session({
    secret:'mysecretapp',
    resave:true,
    saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//variables Globales
app.use((req,res,next)=>{
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null;

    next();
});


//rutas
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/empleados'));

//static files
app.use(express.static(path.join(__dirname,'public')));


//ser is listening
app.listen(app.get('port'),()=>{console.log('server on port', app.get('port'))});