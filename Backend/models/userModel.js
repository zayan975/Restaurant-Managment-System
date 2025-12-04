const mongoose = require ('mongoose')

const userShema = new mongoose.Schema({
    name:{
        type:String,
        reuired:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator: function(v){
                return  /\S+@\S+\.\S+/.test(v);
            },
            message: "Email must be in valid format"
        }
    },
    password:{
        type:String,
        required: true,
    },
    phone:{
        type:String,
        required: true,
        phone: {
  type: String,
  required: true,
  validate: {
    validator: function (v) {
      return /^[0-9]{11}$/.test(v);
    },
    message: "Phone number must be 11 digits"
  }
}

    },
    role:{
        type:String,
        required: true,
    }
},{timestamps:true})

module.exports = mongoose.model("User", userShema);