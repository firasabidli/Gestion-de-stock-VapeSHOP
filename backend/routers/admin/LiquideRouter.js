const express = require('express');
const router = express.Router();
const liquide = require('../../controllers/admin/LiquideController');
const { isAdmin } = require('../../middleware/authMiddleware');

router.post('/', isAdmin, liquide.createLiquide);
router.get('/', liquide.getAllLiquides);
router.get('/filter', liquide.getLiquidesgrouped);
router.put('/:id', isAdmin, liquide.updateLiquide);
router.delete('/:id', isAdmin, liquide.deleteLiquide);

module.exports = router;
