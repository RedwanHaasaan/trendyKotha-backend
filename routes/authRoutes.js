const router = require('express').Router();

const {registerUserController}=require('../controllers/authController');

router.post('/register',registerUserController);


module.exports=router;