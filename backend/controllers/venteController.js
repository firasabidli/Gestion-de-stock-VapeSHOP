const Vente = require('../models/venteModel');
const Vape = require('../models/VapeModel');
const Liquide = require('../models/LiquideModel');
const Accessoire = require('../models/AccessoireModel');
const Service = require('../models/ServiceModel');

const modelsMap = {
  vapes: Vape,
  liquides: Liquide,
  accessoires: Accessoire
};
exports.ajouterVente = async (req, res) => {
  try {
    const { produit_id, type, quantite, prix_unitaire } = req.body;
    const vente_by = req.user.id; // 👈 récupéré via verifyToken

    if (!modelsMap[type]) {
      return res.status(400).json({ message: 'Type de produit invalide.' });
    }

    const total = quantite * prix_unitaire;

    const vente = new Vente({
      produit_id,
      type,
      quantite,
      prix_unitaire,
      total,
      vente_by
    });

    await vente.save();

    await modelsMap[type].findByIdAndUpdate(
      produit_id,
      { $inc: { quantite: -quantite } },
      { new: true }
    );

    res.status(201).json({ message: 'Vente enregistrée avec succès.', vente });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la vente :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.getAllVentes = async (req, res) => {
  try {
    const ventes = await Vente.find();
    res.status(200).json(ventes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const aggregateByType = async (type, collectionName) => {
  return await Vente.aggregate([
    { $match: { type } },

    {
      $lookup: {
        from: collectionName,
        localField: "produit_id",
        foreignField: "_id",
        as: "produit"
      }
    },
    { $unwind: { path: "$produit", preserveNullAndEmptyArrays: true } },

    {
      $lookup: {
        from: "users",
        localField: "vente_by",
        foreignField: "_id",
        as: "vendeur"
      }
    },
    { $unwind: { path: "$vendeur", preserveNullAndEmptyArrays: true } },

    {
      $addFields: {
        heureStr: {
          $dateToString: { format: "%H:%M", date: "$date_vente" }
        },
        jourStr: {
          $dateToString: { format: "%Y-%m-%d", date: "$date_vente" }
        }
      }
    },

    { $sort: { date_vente: 1 } },

    {
      $group: {
        _id: {
          jour: "$jourStr",
          heure: "$heureStr"
        },
        ventes: { $push: "$$ROOT" }
      }
    },

    {
      $group: {
        _id: "$_id.jour",
        heures: {
          $push: {
            heure: "$_id.heure",
            ventes: "$ventes"
          }
        }
      }
    },

    {
      $project: {
        _id: 0,
        date: "$_id",
        heures: 1
      }
    }
  ]);
};



const aggregateServices = async () => {
  return await Service.aggregate([
    {
      $addFields: {
        heureStr: { $dateToString: { format: "%H:%M", date: "$createdAt" } },
        jourStr: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "vendeur"
      }
    },
    { $unwind: { path: "$vendeur", preserveNullAndEmptyArrays: true } },

    { $sort: { createdAt: 1 } },

    {
      $group: {
        _id: {
          jour: "$jourStr",
          heure: "$heureStr"
        },
        services: { $push: "$$ROOT" }
      }
    },

    {
      $group: {
        _id: "$_id.jour",
        heures: {
          $push: {
            heure: "$_id.heure",
            services: "$services"
          }
        }
      }
    },

    {
      $project: {
        _id: 0,
        date: "$_id",
        heures: 1
      }
    }
  ]);
};


exports.getGroupedVentes = async (req, res) => {
  try {
    const [liquides, vapes, accessoires] = await Promise.all([
      aggregateByType("liquides", "liquides"),
      aggregateByType("vapes", "vapes"),
      aggregateByType("accessoires", "accessoires")
    ]);
    const services = await aggregateServices();

    res.status(200).json({
      liquides,
      vapes,
      accessoires,
      services
    });

  } catch (err) {
    console.error("Erreur getGroupedVentes:", err);
    res.status(500).json({ error: "Erreur lors du regroupement des ventes" });
  }
};


