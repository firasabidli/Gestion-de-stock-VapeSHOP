const express = require('express');
const router = express.Router();
const produit = require('../../controllers/admin/ProduitLiquideController');
const { isAdmin } = require('../../middleware/authMiddleware');

router.post('/', isAdmin, produit.createProduit);
router.get('/', produit.getAllProduits);
router.put('/:id', isAdmin, produit.updateProduit);
router.delete('/:id', isAdmin, produit.deleteProduit);

module.exports = router;
