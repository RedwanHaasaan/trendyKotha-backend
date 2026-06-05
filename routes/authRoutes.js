const router = require('express').Router();

const {registerUserController,loginUserController,logoutUser}=require('../controllers/authController');
const signUpValidator = require('../validators/authValidator');
const {isGuest}=require('../middleware/authMiddleware')

router.post('/register',isGuest,signUpValidator,registerUserController);
router.post('/login',isGuest,loginUserController)
router.post("/logout", logoutUser);
module.exports=router;