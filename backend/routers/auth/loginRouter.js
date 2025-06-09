const router = require('express').Router();
const user = require('../../controllers/userController');
const forgotPassword = require('../../controllers/forgotPasswordController');
const { verifyToken } = require('../../middleware/authMiddleware');
router.post('/login', user.login);
router.post('/logout',verifyToken, user.logout);

//forgetPassword

router.post('/forgot-password/step1', forgotPassword.step1);
router.post('/forgot-password/step2', forgotPassword.step2);
router.post('/forgot-password/step3', forgotPassword.step3);

module.exports = router;
