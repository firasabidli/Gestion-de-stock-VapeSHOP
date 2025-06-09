const express = require('express');
const router = express.Router();
const vente = require('../controllers/venteController');
const {  isAdminOrVendeur } = require('../middleware/authMiddleware');

router.post('/', isAdminOrVendeur, vente.ajouterVente);
router.get('/', vente.getAllVentes);
router.get('/group', vente.getGroupedVentes);
module.exports = router;
