const { getUserProfileController,createProfileController } = require('../controllers/profileController');
const { authenticate } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploads');

const router = require('express').Router();

router.get('/me',authenticate,getUserProfileController)
router.post('/create',authenticate,upload.single("profilepicture"),createProfileController)

module.exports=router;