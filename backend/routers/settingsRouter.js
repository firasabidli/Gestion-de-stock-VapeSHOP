const express = require('express');
const router = express.Router();
const user = require('../controllers/userController');

const {  isAdminOrVendeur } = require('../middleware/authMiddleware');

router.get('/profile', isAdminOrVendeur, user.getProfile);
router.put('/update-info', isAdminOrVendeur, user.updateUserInfo);
router.put('/update-password', isAdminOrVendeur, user.updatePassword);

module.exports = router;
