const express = require('express');
const router = express.Router();
const user = require('../../controllers/userController');
const { isAdmin } = require('../../middleware/authMiddleware');

router.post('/', isAdmin, user.createUser);
router.get('/',isAdmin, user.getAllUsers);
router.put('/:id', isAdmin, user.updateUser);
router.delete('/:id', isAdmin, user.deleteUser);

module.exports = router;
