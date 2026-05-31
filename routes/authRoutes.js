const router = require('express').Router();

const {registerUserController,loginUserController,getUserProfileController,logoutUser}=require('../controllers/authController');
const signUpValidator = require('../validators/authValidator');
const {isAuthenticated,isUnAuthenticated}=require('../middleware/authMiddleware')

router.post('/register',isUnAuthenticated,signUpValidator,registerUserController);
router.post('/login',isUnAuthenticated,loginUserController)
router.get('/user',isAuthenticated,getUserProfileController)
router.post("/logout", logoutUser);
module.exports=router;