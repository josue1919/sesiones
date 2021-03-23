const mongoose=require('mongoose');
const {Schema}=mongoose;
const bcrypt=require('bcryptjs');

const UserSchema = new Schema(
    {
      name: { type: String, trim: true },
      email: { type: String, required: true, unique: true, trim: true },
      password: { type: String, required: true },
      filename:{type:String},
      path: {type: String},
      admin:{type:Boolean, default:false},
      date: { type: Date, default: Date.now },
      pages:{type:Array},
      inival:{type:Boolean},
      galeriaval:{type:Boolean},
      mapaval:{type:Boolean},
      ilustracionesval:{type:Boolean},
      eventosval:{type:Boolean},

      user:{type:String},
      



    },
    {
      timestamps: true,
      versionKey: false,
    }
  );
  
  UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };
  
  UserSchema.methods.matchPassword = async function (password) {
    // return await bcrypt.compare(password, this.password);
     return (password, this.password);

  };
  
  module.exports=mongoose.model('User',UserSchema);