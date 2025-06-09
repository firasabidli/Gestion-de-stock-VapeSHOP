const express = require('express');
const router = express.Router();
const service = require('../../controllers/admin/serviceController');
const { isAdminOrVendeur } = require('../../middleware/authMiddleware');

router.post('/', isAdminOrVendeur, service.createService);
router.get('/', service.getAllServices);
router.put('/:id', isAdminOrVendeur, service.updateService);
router.delete('/:id', isAdminOrVendeur, service.deleteService);

module.exports = router;
