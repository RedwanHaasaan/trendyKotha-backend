const router = require('express').Router();

const {registerUserController,loginUserController,logoutUser,changePasswordController,deleteAccountController}=require('../controllers/authController');
const signUpValidator = require('../validators/authValidator');
const {isGuest,authenticate}=require('../middleware/authMiddleware')

router.post('/register',isGuest,signUpValidator,registerUserController);
router.post('/login',isGuest,loginUserController)
router.post("/logout", logoutUser);
router.put("/change-password", authenticate, changePasswordController);
router.delete("/delete-account", authenticate, deleteAccountController);
module.exports=router;