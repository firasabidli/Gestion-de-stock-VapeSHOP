const express = require('express');
const router = express.Router();
const vape = require('../../controllers/admin/VapeController');
const { isAdmin } = require('../../middleware/authMiddleware');

router.post('/', isAdmin, vape.createVape);
router.get('/', vape.getAllVapes);
router.put('/:id', isAdmin, vape.updateVape);
router.delete('/:id', isAdmin, vape.deleteVape);

module.exports = router;
