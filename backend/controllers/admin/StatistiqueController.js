const Vape = require('../../models/VapeModel');
const Liquide = require('../../models/LiquideModel');
const Accessoire = require('../../models/AccessoireModel');
const Vente = require('../../models/venteModel'); 
const ProduitLiquide = require('../../models/ProduitLiquideModel');
const Salary = require('../../models/Salary');
const moment = require('moment');

exports.getStat = async (req, res) => {
  try {
    // Comptage des produits
    const [nbVapes, nbLiquides, nbAccessoires] = await Promise.all([
      Vape.countDocuments(),
      Liquide.countDocuments(),
      Accessoire.countDocuments()
    ]);

    // Comptage des ventes par type (grâce au champ "type" dans Vente)
    const [ventesVapes, ventesLiquides, ventesAccessoires] = await Promise.all([
      Vente.countDocuments({ type: 'vapes' }),
      Vente.countDocuments({ type: 'liquides' }),
      Vente.countDocuments({ type: 'accessoires' })
    ]);

    res.status(200).json({
      vapes: {
        totalProduits: nbVapes,
        totalVentes: ventesVapes
      },
      liquides: {
        totalProduits: nbLiquides,
        totalVentes: ventesLiquides
      },
      accessoires: {
        totalProduits: nbAccessoires,
        totalVentes: ventesAccessoires
      }
    });
  } catch (error) {
    console.error('Erreur dans getStatistiques:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des statistiques.' });
  }
};

exports.getStatistiques = async (req, res) => {
   try {

    // Comptage des produits
    const [nbVapes, nbLiquides, nbAccessoires] = await Promise.all([
      Vape.countDocuments(),
      Liquide.countDocuments(),
      Accessoire.countDocuments()
    ]);

    // Quantité en stock
    const [stockVape, stockLiquide, stockAccessoire] = await Promise.all([
      Vape.aggregate([{ $group: { _id: null, total: { $sum: "$quantite" } } }]),
      Liquide.aggregate([{ $group: { _id: null, total: { $sum: "$quantite" } } }]),
      Accessoire.aggregate([{ $group: { _id: null, total: { $sum: "$quantite" } } }])
    ]);

    // Quantité vendue par type dans le modèle Vente
    const [venteVape, venteLiquide, venteAccessoire] = await Promise.all([
      Vente.aggregate([
        { $match: { type: "vapes" } },
        { $group: { _id: null, total: { $sum: "$quantite" } } }
      ]),
      Vente.aggregate([
        { $match: { type: "liquides" } },
        { $group: { _id: null, total: { $sum: "$quantite" } } }
      ]),
      Vente.aggregate([
        { $match: { type: "accessoires" } },
        { $group: { _id: null, total: { $sum: "$quantite" } } }
      ])
    ]);

    res.status(200).json({
      vapes: {
        totalProduits:nbVapes,
        quantiteStock: stockVape[0]?.total || 0,
        quantiteVendue: venteVape[0]?.total || 0
      },
      liquides: {
        totalProduits:nbLiquides,
        quantiteStock: stockLiquide[0]?.total || 0,
        quantiteVendue: venteLiquide[0]?.total || 0
      },
      accessoires: {
        totalProduits:nbAccessoires,
        quantiteStock: stockAccessoire[0]?.total || 0,
        quantiteVendue: venteAccessoire[0]?.total || 0
      }
    });

  } catch (error) {
    console.error("Erreur getQuantitesStatistiques:", error);
    res.status(500).json({ message: "Erreur lors de l'extraction des statistiques de quantités." });
  }
};

exports.getVentesParSemaineFixe = async (req, res) => {
  try {
    const startDate = req.query.startDate
      ? moment(req.query.startDate).startOf('day')
      : moment().startOf('month');

    // Créer les 5 plages de semaine (7 jours chacune)
    const weeks = Array.from({ length: 5 }, (_, i) => ({
      start: startDate.clone().add(i * 7, 'days').toDate(),
      end: startDate.clone().add((i + 1) * 7 - 1, 'days').endOf('day').toDate()
    }));

    const ventes = await Vente.find({
      date_vente: { $gte: weeks[0].start, $lte: weeks[4].end }
    });

    const results = weeks.map((week, index) => {
      const semaineVentes = ventes.filter(v =>
        v.date_vente >= week.start && v.date_vente <= week.end
      );

      const totalVape = semaineVentes
        .filter(v => v.type === 'vapes')
        .reduce((sum, v) => sum + v.quantite, 0);

      const totalLiquide = semaineVentes
        .filter(v => v.type === 'liquides')
        .reduce((sum, v) => sum + v.quantite, 0);

      const totalAccessoire = semaineVentes
        .filter(v => v.type === 'accessoires')
        .reduce((sum, v) => sum + v.quantite, 0);

      return {
        semaine: `Semaine ${index + 1}`,
        vapes: totalVape,
        liquides: totalLiquide,
        accessoires: totalAccessoire
      };
    });

    res.status(200).json(results);
  } catch (err) {
    console.error("Erreur getVentesParSemaineFixe:", err);
    res.status(500).json({ message: "Erreur serveur." });
  }
};


exports.getStatistiquesRevenuDepense = async (req, res) => {
  try {
    const year = req.query.year ? parseInt(req.query.year) : moment().year();

    const months = Array.from({ length: 12 }, (_, i) => i); // [0..11]

    const data = [];

    for (const monthIndex of months) {
      const startOfMonth = moment({ year, month: monthIndex }).startOf('month').toDate();
      const endOfMonth = moment({ year, month: monthIndex }).endOf('month').toDate();

      // === Revenus ===
      const ventes = await Vente.find({
        date_vente: { $gte: startOfMonth, $lte: endOfMonth }
      });

      const totalRevenu = ventes.reduce((sum, v) => sum + v.total, 0);

      // === Dépenses Vape ===
      const vapes = await Vape.find({ createdAt: { $gte: startOfMonth, $lte: endOfMonth } });
      const totalVape = vapes.reduce((sum, v) => sum + (v.prix_achat * v.quantite), 0);

      // === Dépenses Produit Liquide ===
      const produitsLiquides = await ProduitLiquide.find({ createdAt: { $gte: startOfMonth, $lte: endOfMonth } });
      const totalLiquide = produitsLiquides.reduce((sum, p) => sum + (p.prix_achat_arome + p.prix_achat_base), 0);

      // === Dépenses Accessoire ===
      const accessoires = await Accessoire.find({ createdAt: { $gte: startOfMonth, $lte: endOfMonth } });
      const totalAccessoire = accessoires.reduce((sum, a) => sum + (a.prix_achat * a.quantite), 0);

      // === Salaires ===
      const moisString = `${year}-${String(monthIndex + 1).padStart(2, '0')}`;
      const salaries = await Salary.find({ mois: moisString });
      const totalSalaries = salaries.reduce((sum, s) => sum + s.montant, 0);

      const totalDepense = totalVape + totalLiquide + totalAccessoire + totalSalaries;

      data.push({
        mois: moment({ month: monthIndex }).format('MMMM'), // ex: Janvier
        revenu: totalRevenu,
        depense: totalDepense
      });
    }

    res.status(200).json({ year, data });
  } catch (error) {
    console.error("Erreur getStatistiquesRevenuDepense:", error);
    res.status(500).json({ message: "Erreur lors du calcul des statistiques." });
  }
};



