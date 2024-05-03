const mongoose = require('mongoose')
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true, "Please Enter your name"],
        maxLength:[30, "Name cannot exceed"],
        minLength:[3, "Name should have atleast 4 character"]
    
    },
    email:{
        type:String,
        required:[true , "Please Enter your email"],
        unique:true,
        validator:[validator.isEmail, "Please enter your valid email"]

    },
    password:{
        type:String,
        required:[true, "Please Enter your Password"],
        minLength:[8 , "Password should be greater than 8 characters"],
        select:false
    },
    

},{timestamps:true})



userSchema.pre("save", async function(next){

    if(!this.isModified("password")) {
       next();
    }
    
    this.password = await bcrypt.hash(this.password,10)
  })


  userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
       expiresIn:process.env.JWT_EXPIRE
    }) 
    
}

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}
module.exports = mongoose.model("User" , userSchema)


