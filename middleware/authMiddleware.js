const User = require('../models/User')
const mongoose = require("mongoose")

exports.bindUserWithRequest=()=>{
    return async (req,res,next)=>{
        if(!req.session.isLoggedIn){
            return next()
        }
        try{
            let user = await User.findById(req.session.userId).select("-password");
            req.user=user
            next()
        }catch(error){
            console.log(error)
            next(error)
        }
    }
}

exports.isAuthenticated = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. Please login first.",
    });
  }

  next();
};

exports.isUnAuthenticated = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. User Already Logged In.",
    });
  }

  next();
};