const router = require('express').Router();

const {registerUserController,loginUserController}=require('../controllers/authController');
const signUpValidator = require('../validators/authValidator');

router.post('/register',signUpValidator,registerUserController);
router.post('/login',loginUserController)


module.exports=router;