const { getUserProfileController } = require('../controllers/profileController');
const { authenticate } = require('../middleware/authMiddleware');

const router = require('express').Router();

router.get('/me',authenticate,getUserProfileController)

module.exports=router;