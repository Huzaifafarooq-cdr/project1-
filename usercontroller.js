const catchasyncerror = require('../middleware/catchasyncerror')
const User = require('../models/usermodel')
const sendToken = require('../utils/jwttoken')


exports.registerUser = catchasyncerror(async(req,res,next)=>{

   try {
     const {name ,email , password} = req.body
 
     const user = await User.create({
         name,
         email,
         password
     })

     sendToken(user,201,res)
   } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
   }
})


exports.loginUser = catchasyncerror(async(req,res,next)=>{
    
    const {email , password} = req.body

    if(!email || !password){
        return res.status(400).send({ error });
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return res.status(500) ,send("Invalid password or email")
    }
    const isPasswordMatched = await user.comparePassword(password)

    if(!isPasswordMatched){
        return res.status(500) , send("Enter the correct password")
    }
    sendToken(user,200,res);
})