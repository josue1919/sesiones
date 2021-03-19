const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/empleados',{

    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology: true
})
.then(db=>console.log('conexion exitosa'))
.catch(err=>console.log(err))