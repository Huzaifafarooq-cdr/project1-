const catchasyncErrors = require("./catchasyncerror");
const jwt = require("jsonwebtoken")
const User = require("../models/usermodel")


exports.isAuthenticatedUser = catchasyncErrors(async(req,res,next)=>{
      
     const {token} = req.cookies;

     if(!token){
        return next(new ErrorHandler("Please login to access resource",401))
     }

    const decodedData = jwt.verify(token,process.env.JWT_SECRET);

    req.user = await User.findById(decodedData._id)
    next();


});