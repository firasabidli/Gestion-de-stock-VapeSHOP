const express = require('express');
const router = express.Router();
const stat = require('../../controllers/admin/StatistiqueController');
const { isAdmin } = require('../../middleware/authMiddleware');


router.get('/nbProduits', stat.getStatistiques);
router.get('/ventes-par-semaine-fixe', stat.getVentesParSemaineFixe);
router.get('/revenu-depense', stat.getStatistiquesRevenuDepense);



module.exports = router;
