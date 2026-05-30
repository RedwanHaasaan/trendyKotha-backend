const {body} = require("express-validator")
const User = require("../models/User")

const signUpValidator= [
    body('username').trim().isLength({min:3,max:30}).withMessage('User Name Must Be Between 3 to 30 Character')
    .custom(async (name)=>{
        let user = await User.findOne({username:name})

        if(user){
            return Promise.reject('User Name Already Exists')
        }
    }),

    body('email').normalizeEmail({gmail_remove_dots:false}).isEmail().withMessage('Please Provide a valid Email')
    .custom(async (email)=>{
        let user= await User.findOne({email})
        if(user){
            return Promise.reject('Email Already Used')
        }
    }),
    body('password').isLength({min:8}).withMessage('Password Must Be Minimum 8 Character')
]

module.exports=signUpValidator