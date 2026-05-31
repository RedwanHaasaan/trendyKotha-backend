const router = require('express').Router();

const {registerUserController,loginUserController,getUserProfileController,logoutUser}=require('../controllers/authController');
const signUpValidator = require('../validators/authValidator');
const {isAuthenticated}=require('../middleware/authMiddleware')

router.post('/register',signUpValidator,registerUserController);
router.post('/login',loginUserController)
router.get('/user',isAuthenticated,getUserProfileController)
router.post("/logout", logoutUser);
module.exports=router;