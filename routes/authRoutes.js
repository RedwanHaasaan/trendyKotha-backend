const router = require('express').Router();

const {registerUserController,loginUserController,logoutUser,changePasswordController}=require('../controllers/authController');
const signUpValidator = require('../validators/authValidator');
const {isGuest,authenticate}=require('../middleware/authMiddleware')

router.post('/register',isGuest,signUpValidator,registerUserController);
router.post('/login',isGuest,loginUserController)
router.post("/logout", logoutUser);
router.put("/change-password", authenticate, changePasswordController);
module.exports=router;