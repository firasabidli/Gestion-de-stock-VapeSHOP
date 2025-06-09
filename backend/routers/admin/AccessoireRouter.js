const express = require('express');
const router = express.Router();
const accessoire = require('../../controllers/admin/AccessoireController');
const { isAdmin } = require('../../middleware/authMiddleware');

router.post('/', isAdmin, accessoire.createAccessoire);
router.get('/', accessoire.getAllAccessoires);
router.put('/:id', isAdmin, accessoire.updateAccessoire);
router.delete('/:id', isAdmin, accessoire.deleteAccessoire);

module.exports = router;
