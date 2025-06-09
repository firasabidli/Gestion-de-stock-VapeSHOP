// controllers/DepenseDetailsController.js
const Vape = require('../../models/VapeModel');
const Liquide = require('../../models/LiquideModel');
const ProduitLiquide = require('../../models/ProduitLiquideModel');
const Accessoire = require('../../models/AccessoireModel');
const Salary = require('../../models/Salary');
const Vente = require('../../models/venteModel');
const moment = require('moment');



exports.getDepenseDetails = async (req, res) => {
  try {
    const startDate = req.query.startDate ? new Date(req.query.startDate) : moment().startOf('month').toDate();
    const endDate = req.query.endDate ? new Date(req.query.endDate) : moment().endOf('month').toDate();

    // 1. Dépenses Vape
    const vapeData = await Vape.find({ createdAt: { $gte: startDate, $lte: endDate } });
    const vapeDetails = vapeData.map(v => ({
      date: v.createdAt,
      nom: v.nom,
      prix_achat: v.prix_achat,
      quantite: v.quantite,
      total: v.prix_achat * v.quantite
    }));
    const totalVape = vapeDetails.reduce((sum, v) => sum + v.total, 0);

    // 2. Dépenses Produit Liquide
    const liquideData = await ProduitLiquide.find({ createdAt: { $gte: startDate, $lte: endDate } });
    const liquideDetails = liquideData.map(l => ({
      date: l.createdAt,
      prix_arome: l.prix_achat_arome,
      qte_arome: l.arome_ml,
      prix_base: l.prix_achat_base,
      qte_base: l.base_l,
      total_arome: l.prix_achat_arome ,
      total_base: l.prix_achat_base 
    }));
    const totalLiquide = liquideDetails.reduce((sum, l) => sum + l.total_arome + l.total_base, 0);

    // 3. Dépenses Accessoires
    const accessoireData = await Accessoire.find({ createdAt: { $gte: startDate, $lte: endDate } });
    const accessoireDetails = accessoireData.map(a => ({
      date: a.createdAt,
      nom: a.nom,
      prix_achat: a.prix_achat,
      quantite: a.quantite,
      total: a.prix_achat * a.quantite
    }));
    const totalAccessoire = accessoireDetails.reduce((sum, a) => sum + a.total, 0);

    // 4. Paiement des employés regroupé par employé avec liste
    const formatMonth = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); // 01 à 12
  return `${year}-${month}`;
};

const startMonth = formatMonth(startDate);
const endMonth = formatMonth(endDate);

const salaryData = await Salary.find({
  mois: { $gte: startMonth, $lte: endMonth }
}).populate('user', 'name');

    const salaryGrouped = {};
    salaryData.forEach(s => {
      const nom = s.user?.name || 'Employé inconnu';
      if (!salaryGrouped[nom]) {
        salaryGrouped[nom] = { nom, paiements: [], total: 0 };
      }
      salaryGrouped[nom].paiements.push({ mois: s.mois, montant: s.montant });
      salaryGrouped[nom].total += s.montant;
    });
    const salaryDetails = Object.values(salaryGrouped);
    const totalSalaries = salaryDetails.reduce((sum, s) => sum + s.total, 0);
    const totalDepense = totalVape + totalLiquide + totalAccessoire + totalSalaries ;
    res.json({
      vape: vapeDetails,
      totalVape,
      produitLiquide: liquideDetails,
      totalLiquide,
      accessoire: accessoireDetails,
      totalAccessoire,
      salaries: salaryDetails,
      totalSalaries,
      totalDepense: totalDepense
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de l\'extraction des détails des dépenses.' });
  }
};

// controllers/RevenuDetailsController.js


exports.getRevenuDetails = async (req, res) => {
  try {
    const startDate = req.query.startDate ? new Date(req.query.startDate) : moment().startOf('month').toDate();
    const endDate = req.query.endDate ? new Date(req.query.endDate) : moment().endOf('month').toDate();

    const ventes = await Vente.find({ date_vente: { $gte: startDate, $lte: endDate } })
      .populate('produit_id') // refPath est dynamique : mongoose gère automatiquement
      .populate('vente_by', 'name'); // optionnel pour voir le vendeur

    // Initialisation des tableaux
    const vapeDetails = [];
    const liquideDetails = [];
    const accessoireDetails = [];

    let totalVape = 0;
    let totalLiquide = 0;
    let totalAccessoire = 0;

    for (const vente of ventes) {
      const produit = vente.produit_id;
      const item = {
        date: vente.date_vente,
        nom: produit?.nom || 'Inconnu',
        quantite: vente.quantite,
        prix_vente: vente.prix_unitaire,
        total: vente.total,
        vendu_par: vente.vente_by?.name || 'N/A'
      };

      switch (vente.type) {
        case 'vapes':
          vapeDetails.push(item);
          totalVape += vente.total;
          break;
        case 'liquides':
          liquideDetails.push({
            ...item,
            categorie: produit?.categorie || 'N/A',
            type: produit?.type || 'N/A'
          });
          totalLiquide += vente.total;
          break;
        case 'accessoires':
          accessoireDetails.push(item);
          totalAccessoire += vente.total;
          break;
      }
    }

    const totalRevenu = totalVape + totalLiquide + totalAccessoire;

    res.status(200).json({
      vapes: vapeDetails,
      totalVape,
      liquides: liquideDetails,
      totalLiquide,
      accessoires: accessoireDetails,
      totalAccessoire,
      totalRevenu
    });
  } catch (error) {
    console.error('Erreur getRevenuDetails:', error);
    res.status(500).json({ message: "Erreur lors de l'extraction des revenus." });
  }
};

exports.getStockDetails = async (req, res) => {
  try {
    const [vapes, liquides, accessoires] = await Promise.all([
      Vape.find({}, 'nom quantite prix_achat prix_vente'),
      Liquide.find({}, 'nom quantite prix_vente categorie type'),
      Accessoire.find({}, 'nom quantite prix_achat prix_vente')
    ]);

    // Calcule des totaux par type
    const totalVape = vapes.reduce((sum, item) => sum + (item.quantite * (item.prix_vente || 0)), 0);
    const totalLiquide = liquides.reduce((sum, item) => sum + (item.quantite * (item.prix_vente || 0)), 0);
    const totalAccessoire = accessoires.reduce((sum, item) => sum + (item.quantite * (item.prix_vente || 0)), 0);

    const totalStock = totalVape + totalLiquide + totalAccessoire;

    res.status(200).json({
      vapes,
      liquides,
      accessoires,
      totalVape,
      totalLiquide,
      totalAccessoire,
      totalStock
    });
  } catch (err) {
    console.error("Erreur lors de l'extraction du stock :", err);
    res.status(500).json({ message: "Erreur lors de la récupération du stock." });
  }
};


