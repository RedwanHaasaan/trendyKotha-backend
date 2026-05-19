const router = require('express').Router();

const {registerUserController,loginUserController}=require('../controllers/authController');

router.post('/register',registerUserController);
router.post('/login',loginUserController)


module.exports=router;