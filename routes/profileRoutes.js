const { getUserProfileController,createProfileController,getProfileController,updateProfileController } = require('../controllers/profileController');
const { authenticate } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploads');

const router = require('express').Router();

router.get('/me',authenticate,getUserProfileController)
router.post('/create',authenticate,upload.single("profilepicture"),createProfileController)
router.put('/update',authenticate,upload.single("profilepicture"),updateProfileController)
router.get('/get/:id',authenticate,getProfileController)

module.exports=router;