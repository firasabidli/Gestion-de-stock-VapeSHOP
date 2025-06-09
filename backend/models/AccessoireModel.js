const mongoose = require('mongoose');

const accessoireSchema = new mongoose.Schema({
  nom: String,
  categorie: String,
  quantite: Number,
  prix_achat: Number,
  prix_vente: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('accessoires', accessoireSchema);
