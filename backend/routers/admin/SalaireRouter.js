const express = require('express');
const router = express.Router();
const userSalaire = require('../../controllers/userController');
const { isAdmin } = require('../../middleware/authMiddleware');

router.post('/', isAdmin, userSalaire.donnerAvanceOuPayer);
router.get('/',  userSalaire.historiqueSalaireAllEmploye);
router.get('/employe/:id',  userSalaire.historiqueSalaireOneEmploye);


module.exports = router;
