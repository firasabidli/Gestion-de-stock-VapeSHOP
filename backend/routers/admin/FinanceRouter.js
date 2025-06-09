const express = require('express');
const router = express.Router();
const finance = require('../../controllers/admin/FinanceController');
const { isAdmin } = require('../../middleware/authMiddleware');

router.get('/depense', finance.getDepenseDetails);
router.get('/revenus', finance.getRevenuDetails);
router.get('/stock', finance.getStockDetails);

module.exports = router;
